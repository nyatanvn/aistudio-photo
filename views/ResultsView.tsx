import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Pose, GeneratedImage, AspectRatio } from '../types';
import { ErrorMessage } from '../components/ErrorMessage';
import { editImageWithGemini } from '../services/geminiService';
import { fileToBase64, cropImageToAspectRatio } from '../utils/fileUtils';
import { ResultCard } from '../components/ResultCard';

interface ResultsViewProps {
  originalImageFile: File;
  selectedPoses: Pose[];
  toolName: string;
  buildPrompt: (pose: Pose, customPrompt?: string) => string;
  onBackToEditor: () => void;
  clothingReferenceImage: string | null;
  selectedAspectRatio: AspectRatio;
}

const BackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-slate-400">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400"></div>
    <p className="mt-4 text-lg">AI đang sáng tạo kiệt tác...</p>
    <p className="text-sm text-neutral-500">Quá trình này có thể mất một chút thời gian.</p>
  </div>
);

export default function ResultsView({ originalImageFile, selectedPoses, toolName, buildPrompt, onBackToEditor, clothingReferenceImage, selectedAspectRatio }: ResultsViewProps) {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const processedImagePromise = useMemo(() => {
    return (async () => {
        try {
            const originalImageBase64 = await fileToBase64(originalImageFile);
            const croppedImageBase64WithHeader = await cropImageToAspectRatio(originalImageBase64, selectedAspectRatio.id);
            const match = croppedImageBase64WithHeader.match(/^data:(image\/.+);base64,(.+)$/);
            if (!match) {
                throw new Error("Không thể phân tích chuỗi base64 của ảnh đã cắt.");
            }
            return { mimeType: match[1], data: match[2] };
        } catch(e) {
            console.error("Lỗi khi cắt ảnh:", e);
            return null;
        }
    })();
  }, [originalImageFile, selectedAspectRatio]);


  const handleInitialGenerate = useCallback(async () => {
    setIsInitialLoading(true);
    setError(null);

    const initialImages: GeneratedImage[] = selectedPoses.map(pose => ({
        pose: pose,
        url: '',
        customPrompt: '',
        isLoading: true,
    }));
    setGeneratedImages(initialImages);

    try {
        const imagePart = await processedImagePromise;
        if(!imagePart) throw new Error("Không thể chuẩn bị ảnh để tạo.");

        // Cắt các hình ảnh tham chiếu theo đúng tỷ lệ khung hình để đảm bảo tính nhất quán
        const croppedClothingRef = clothingReferenceImage ? await cropImageToAspectRatio(clothingReferenceImage, selectedAspectRatio.id) : null;
        
        const generationPromises = selectedPoses.map(async (pose): Promise<GeneratedImage> => {
            try {
                const prompt = buildPrompt(pose);
                const resultBase64 = await editImageWithGemini(imagePart.data, imagePart.mimeType, prompt, croppedClothingRef);
                
                if (resultBase64) {
                    return {
                        pose,
                        url: `data:image/png;base64,${resultBase64}`,
                        customPrompt: '',
                        isLoading: false,
                    };
                } else {
                    return { pose, url: '', customPrompt: '', isLoading: false };
                }
            } catch (singleError) {
                console.error(`Lỗi khi tạo ảnh cho pose "${pose.name}":`, singleError);
                return { pose, url: '', customPrompt: '', isLoading: false };
            }
        });

        const finalImages = await Promise.all(generationPromises);
        
        setGeneratedImages(finalImages);

        const resultsCount = finalImages.filter(img => img.url).length;
        if (resultsCount === 0) {
            setError('Không thể tạo hình ảnh. AI không trả về kết quả hình ảnh nào.');
        }

    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.');
        setGeneratedImages(prev => prev.map(img => ({ ...img, isLoading: false })));
    } finally {
        setIsInitialLoading(false);
    }
  }, [selectedPoses, buildPrompt, clothingReferenceImage, processedImagePromise]);


  useEffect(() => {
    handleInitialGenerate();
  }, [handleInitialGenerate]);

  const handleRegenerateSingleImage = useCallback(async (index: number) => {
    const imageToRegen = generatedImages[index];
    if (!imageToRegen) return;

    setGeneratedImages(prev => prev.map((img, i) => i === index ? { ...img, isLoading: true } : img));
    setError(null);

    try {
        const imagePart = await processedImagePromise;
        if(!imagePart) throw new Error("Không thể chuẩn bị ảnh để tạo lại.");

        // Cắt các hình ảnh tham chiếu theo đúng tỷ lệ khung hình để đảm bảo tính nhất quán
        const croppedClothingRef = clothingReferenceImage ? await cropImageToAspectRatio(clothingReferenceImage, selectedAspectRatio.id) : null;

        const finalPrompt = buildPrompt(imageToRegen.pose, imageToRegen.customPrompt);

        const resultBase64 = await editImageWithGemini(imagePart.data, imagePart.mimeType, finalPrompt, croppedClothingRef);

        if (resultBase64) {
            const updatedImage: GeneratedImage = {
                ...imageToRegen,
                url: `data:image/png;base64,${resultBase64}`,
                isLoading: false,
            };
            setGeneratedImages(prev => prev.map((img, i) => i === index ? updatedImage : img));
        } else {
            throw new Error('AI không trả về hình ảnh nào.');
        }
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Không thể tạo lại ảnh.');
        setGeneratedImages(prev => prev.map((img, i) => i === index ? { ...img, isLoading: false } : img));
    }
  }, [generatedImages, buildPrompt, clothingReferenceImage, processedImagePromise]);
  
  const handleCustomPromptChange = (index: number, newPrompt: string) => {
      setGeneratedImages(prev => prev.map((img, i) => i === index ? {...img, customPrompt: newPrompt} : img));
  };

  const isGenerating = generatedImages.some(img => img.isLoading);

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col max-h-screen">
        <div className="flex-shrink-0 flex items-center justify-between mb-6">
            <button 
                onClick={onBackToEditor}
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-neutral-800 disabled:opacity-50"
                disabled={isGenerating}
            >
                <BackIcon />
                Quay Lại Chỉnh Sửa
            </button>
            <h1 className="text-3xl font-bold text-slate-100 hidden md:block">Kết Quả - {toolName}</h1>
            <div className="w-40 text-right"></div>
        </div>
        <div className="flex-grow rounded-lg min-h-0 relative">
            {error && <div className="mb-4"><ErrorMessage message={error} /></div>}
            
            {isInitialLoading ? (
                 <div className="w-full h-full flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full overflow-y-auto pb-6 pr-2 -mr-4">
                    {generatedImages.map((image, index) => (
                        <ResultCard
                            key={`${image.pose.id}-${index}`}
                            image={image}
                            onRegenerate={() => handleRegenerateSingleImage(index)}
                            onPromptChange={(newPrompt) => handleCustomPromptChange(index, newPrompt)}
                        />
                    ))}
                </div>
            )}
        </div>
    </main>
  );
}