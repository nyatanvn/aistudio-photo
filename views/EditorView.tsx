import React, { useState, useEffect, useRef } from 'react';
import type { Pose, Framing, ImageStyle, PoseCategory, Background, Expression, ToolConstants, ImageItem, AspectRatio, Fidelity } from '../types';
import { Header } from '../components/Header';
import { ImageUploader } from '../components/ImageUploader';
import { PoseSelector } from '../components/PoseSelector';
import { ActionButton } from '../components/ActionButton';
import { ErrorMessage } from '../components/ErrorMessage';
import { FramingSelector } from '../components/FramingSelector';
import { StyleSelector } from '../components/StyleSelector';
import { BackgroundSelector } from '../components/BackgroundSelector';
import { ExpressionSelector } from '../components/ExpressionSelector';
import { AspectRatioSelector } from '../components/AspectRatioSelector';
import { FidelitySelector } from '../components/FidelitySelector';
import { compressImage } from '../utils/fileUtils';
import { generateImageFromText } from '../services/geminiService';
import { ASPECT_RATIO_OPTIONS } from '../constants-aspect-ratio';
import { FIDELITY_OPTIONS } from '../constants-fidelity';


// =================================================================
// ClothingManager Component
// =================================================================
interface ClothingManagerProps {
  mode: 'auto' | 'reference';
  onModeChange: (mode: 'auto' | 'reference') => void;
  referenceImage: string | null;
  onReferenceImageChange: (imageBase64: string | null) => void;
  library: ImageItem[];
  setLibrary: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  clothingSuggestionPrompt: string;
  toolName: string;
}

const ClothingManager: React.FC<ClothingManagerProps> = ({ mode, onModeChange, referenceImage, onReferenceImageChange, library, setLibrary, clothingSuggestionPrompt, toolName }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'ai'>('upload');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModeChange = (newMode: 'auto' | 'reference') => {
    onModeChange(newMode);
    if (newMode === 'auto') {
      onReferenceImageChange(null);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 512, 0.9);
        onReferenceImageChange(compressed);
        onModeChange('reference');
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
    event.target.value = '';
  };
  
  const handleGenerateClick = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setGenerationError('');
    try {
        const generatedImage = await generateImageFromText(aiPrompt);
        if(generatedImage) {
            const newItem: ImageItem = { id: Date.now().toString(), src: generatedImage };
            setLibrary(prev => [newItem, ...prev]);
            onReferenceImageChange(generatedImage);
            onModeChange('reference');
        } else {
            setGenerationError('AI không trả về hình ảnh.');
        }
    } catch (error) {
        setGenerationError(error instanceof Error ? error.message : 'Lỗi không xác định.');
    } finally {
        setIsGenerating(false);
    }
  };
  
  const handleSuggestClick = async () => {
    if (!clothingSuggestionPrompt) return;
    setIsGenerating(true);
    setGenerationError('');
    try {
        const generatedImage = await generateImageFromText(clothingSuggestionPrompt);
        if(generatedImage) {
            const newItem: ImageItem = { id: Date.now().toString(), src: generatedImage };
            setLibrary(prev => [newItem, ...prev]);
            onReferenceImageChange(generatedImage);
            onModeChange('reference');
        } else {
            setGenerationError('AI không trả về hình ảnh.');
        }
    } catch (error) {
        setGenerationError(error instanceof Error ? error.message : 'Lỗi không xác định.');
    } finally {
        setIsGenerating(false);
    }
  };


  return (
    <div>
        <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleModeChange('auto')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-amber-500 ${mode === 'auto' ? 'bg-amber-500 text-neutral-900 shadow-md shadow-amber-500/20' : 'bg-neutral-800 text-slate-300 hover:bg-neutral-700'}`}
            >Để AI quyết định</button>
            <button
              onClick={() => handleModeChange('reference')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-amber-500 ${mode === 'reference' ? 'bg-amber-500 text-neutral-900 shadow-md shadow-amber-500/20' : 'bg-neutral-800 text-slate-300 hover:bg-neutral-700'}`}
            >Sử dụng ảnh tham khảo</button>
        </div>
        
        {mode === 'reference' && (
            <div className="mt-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                <div className="flex border-b border-neutral-700 mb-4">
                    <button onClick={() => setActiveTab('upload')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'upload' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'}`}>Tải lên</button>
                    <button onClick={() => setActiveTab('ai')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'ai' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'}`}>AI Tạo</button>
                </div>

                {activeTab === 'upload' && (
                    <div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg"/>
                        <button onClick={() => fileInputRef.current?.click()} className="w-full text-center p-4 border-2 border-dashed border-neutral-600 rounded-md hover:border-amber-500 transition-colors">
                            <p>Nhấn để chọn ảnh trang phục</p>
                        </button>
                    </div>
                )}
                
                {activeTab === 'ai' && (
                    <div>
                        <button
                            onClick={handleSuggestClick}
                            disabled={isGenerating}
                            className="w-full flex items-center justify-center gap-2 mb-3 px-4 py-2 text-sm font-semibold rounded-md bg-neutral-700/80 text-amber-300 hover:bg-neutral-600/80 disabled:opacity-50 transition-colors"
                        >
                           ✨ Gợi ý trang phục theo chủ đề "{toolName}"
                        </button>

                        <div className="flex gap-2">
                            <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Hoặc tự mô tả (vd: váy dạ hội đỏ)..." className="flex-grow text-sm px-3 py-2 bg-neutral-700/60 border border-neutral-600 rounded-md text-slate-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"/>
                            <button onClick={handleGenerateClick} disabled={isGenerating || !aiPrompt.trim()} className="px-4 py-2 text-sm font-bold rounded-md bg-amber-500 text-neutral-900 hover:bg-amber-400 disabled:opacity-50">
                                {isGenerating ? 'Đang tạo...' : 'Tạo'}
                            </button>
                        </div>
                        {generationError && <p className="text-xs text-red-400 mt-2">{generationError}</p>}
                        
                        <h4 className="text-xs font-semibold uppercase text-slate-400 mt-4 mb-2">Thư viện trang phục</h4>
                        {library.length > 0 ? (
                            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                                {library.map(item => (
                                    <button key={item.id} onClick={() => onReferenceImageChange(item.src)} className={`aspect-square rounded-md overflow-hidden focus:outline-none ring-2 ring-offset-2 ring-offset-neutral-800 ${referenceImage === item.src ? 'ring-amber-500' : 'ring-transparent'}`}>
                                        <img src={item.src} alt="AI generated clothing" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-neutral-500 text-center py-4">Chưa có trang phục nào được tạo.</p>
                        )}
                    </div>
                )}
                
                {referenceImage && (
                    <div className="mt-4">
                        <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Đang sử dụng</h4>
                        <img src={referenceImage} alt="Reference" className="w-24 h-24 object-cover rounded-md" />
                    </div>
                )}
            </div>
        )}
    </div>
  );
}


// =================================================================
// EditorView Component
// =================================================================
interface EditorViewProps {
  toolName: string;
  toolDescription: string;
  constants: ToolConstants;
  clothingSuggestionPrompt: string;
  initialImageFile: File | null;
  initialSelectedPoses: Pose[];
  initialSelectedFraming: Framing;
  initialSelectedImageStyle: ImageStyle;
  initialSelectedBackground: Background;
  initialSelectedExpression: Expression;
  initialClothingMode: 'auto' | 'reference';
  initialClothingReferenceImage: string | null;
  initialNegativePrompt: string;
  initialSelectedAspectRatio: AspectRatio;
  initialSelectedFidelity: Fidelity;
  clothingLibrary: ImageItem[];
  setClothingLibrary: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  onGenerate: (
    file: File, 
    poses: Pose[], 
    framing: Framing, 
    style: ImageStyle, 
    background: Background, 
    expression: Expression, 
    clothingMode: 'auto' | 'reference', 
    clothingRefImage: string | null, 
    negativePrompt: string,
    aspectRatio: AspectRatio,
    fidelity: Fidelity
  ) => void;
}

export default function EditorView({ 
  toolName,
  toolDescription,
  constants,
  clothingSuggestionPrompt,
  initialImageFile, 
  initialSelectedPoses,
  initialSelectedFraming,
  initialSelectedImageStyle,
  initialSelectedBackground,
  initialSelectedExpression,
  initialClothingMode,
  initialClothingReferenceImage,
  initialNegativePrompt,
  initialSelectedAspectRatio,
  initialSelectedFidelity,
  clothingLibrary,
  setClothingLibrary,
  onGenerate 
}: EditorViewProps) {
  const [imageFile, setImageFile] = useState<File | null>(initialImageFile);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [selectedPoses, setSelectedPoses] = useState<Pose[]>(initialSelectedPoses);
  const [selectedFraming, setSelectedFraming] = useState<Framing>(initialSelectedFraming);
  const [selectedImageStyle, setSelectedImageStyle] = useState<ImageStyle>(initialSelectedImageStyle);
  const [selectedBackground, setSelectedBackground] = useState<Background>(initialSelectedBackground);
  const [selectedExpression, setSelectedExpression] = useState<Expression>(initialSelectedExpression);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>(initialSelectedAspectRatio);
  const [selectedFidelity, setSelectedFidelity] = useState<Fidelity>(initialSelectedFidelity);
  const [clothingMode, setClothingMode] = useState<'auto' | 'reference'>(initialClothingMode);
  const [clothingReferenceImage, setClothingReferenceImage] = useState<string|null>(initialClothingReferenceImage);
  const [negativePrompt, setNegativePrompt] = useState<string>(initialNegativePrompt);
  const [error, setError] = useState<string | null>(null);
  
  const allPoses = constants.POSE_CATEGORIES.flatMap(category => category.poses);

  useEffect(() => {
    if (initialImageFile && !imageUrl) {
      const objectURL = URL.createObjectURL(initialImageFile);
      setImageUrl(objectURL);
      
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [initialImageFile, imageUrl]);
  
  useEffect(() => {
    try {
        localStorage.setItem('clothingLibrary', JSON.stringify(clothingLibrary));
    } catch(e) {
        console.error("Failed to save clothing library to localStorage", e);
    }
  }, [clothingLibrary]);

  const handleImageChange = async (file: File | null) => {
    // Clear previous state
    setImageFile(file);
    setImageUrl(null);
    setError(null);

    if (file) {
      try {
        // Create a temporary URL for the full image preview
        const objectURL = URL.createObjectURL(file);
        setImageUrl(objectURL);
      } catch (e) {
        setError("Không thể xử lý hình ảnh.");
        console.error(e);
      }
    }
  };
  
  const handlePoseToggle = (pose: Pose) => {
    setSelectedPoses(prev =>
      prev.some(p => p.id === pose.id)
        ? prev.filter(p => p.id !== pose.id)
        : [...prev, pose]
    );
     setError(null);
  };

  const handleGenerateClick = () => {
    if (!imageFile) {
      setError('Vui lòng tải lên một hình ảnh trước.');
      return;
    }
    if (selectedPoses.length === 0) {
      setError('Vui lòng chọn ít nhất một kiểu dáng.');
      return;
    }
    onGenerate(imageFile, selectedPoses, selectedFraming, selectedImageStyle, selectedBackground, selectedExpression, clothingMode, clothingReferenceImage, negativePrompt, selectedAspectRatio, selectedFidelity);
  };
  
  const handleSelectAllPoses = () => {
    setSelectedPoses(allPoses);
  };

  const handleDeselectAllPoses = () => {
    setSelectedPoses([]);
  };

  const handleToggleCategorySelection = (category: PoseCategory) => {
    const categoryPoseIds = new Set(category.poses.map(p => p.id));
    const selectedPoseIds = new Set(selectedPoses.map(p => p.id));
    const areAllSelected = category.poses.every(p => selectedPoseIds.has(p.id));

    if (areAllSelected) {
      setSelectedPoses(prev => prev.filter(p => !categoryPoseIds.has(p.id)));
    } else {
      const newPoses = category.poses.filter(p => !selectedPoseIds.has(p.id));
      setSelectedPoses(prev => [...prev, ...newPoses]);
    }
  };

  return (
    <>
    <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cột 1: Bảng điều khiển */}
      <div className="lg:col-span-1 bg-neutral-900/50 p-6 rounded-2xl shadow-2xl shadow-black/20 border border-neutral-800 flex flex-col h-full max-h-[90vh]">
        <Header title={toolName} description={toolDescription} />
        <div className="mt-8 flex-grow flex flex-col">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">Bước 1: Tải Ảnh Gốc</h2>
          <ImageUploader onImageChange={handleImageChange} originalImageUrl={imageUrl} />
        </div>
        <div className="mt-auto pt-6">
          <ActionButton
            onClick={handleGenerateClick}
            isLoading={false}
            disabled={!imageFile || selectedPoses.length === 0}
            selectedCount={selectedPoses.length}
          />
          {error && <div className="mt-4"><ErrorMessage message={error} /></div>}
        </div>
      </div>

      {/* Cột 2: Không gian sáng tạo */}
      <div className="lg:col-span-2 bg-neutral-900/50 p-6 rounded-2xl shadow-2xl shadow-black/20 border border-neutral-800 flex flex-col min-h-0 max-h-[90vh]">
        <div className="flex-grow overflow-y-auto pr-2 -mr-4">
            <div className='mb-8'>
                <h2 className="text-lg font-semibold text-slate-100 mb-3">Bước 2: Chọn Phong Cách & Tùy Chỉnh</h2>
                <div className="space-y-6">
                  <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Độ Giống Gương Mặt</h3>
                      <FidelitySelector options={FIDELITY_OPTIONS} selectedOption={selectedFidelity} onSelect={setSelectedFidelity} />
                  </div>
                  <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Chất ảnh & Ánh sáng</h3>
                      <StyleSelector options={constants.IMAGE_STYLE_OPTIONS} selectedOption={selectedImageStyle} onSelect={setSelectedImageStyle} />
                  </div>
                   <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Tỷ lệ đầu ra</h3>
                      <AspectRatioSelector options={ASPECT_RATIO_OPTIONS} selectedOption={selectedAspectRatio} onSelect={setSelectedAspectRatio} />
                  </div>
                  <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Bố cục (Khung hình)</h3>
                      <FramingSelector options={constants.FRAMING_OPTIONS} selectedOption={selectedFraming} onSelect={setSelectedFraming} />
                  </div>
                  <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Trang phục</h3>
                      <ClothingManager 
                        mode={clothingMode}
                        onModeChange={setClothingMode}
                        referenceImage={clothingReferenceImage}
                        onReferenceImageChange={setClothingReferenceImage}
                        library={clothingLibrary}
                        setLibrary={setClothingLibrary}
                        clothingSuggestionPrompt={clothingSuggestionPrompt}
                        toolName={toolName}
                      />
                  </div>
                  <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Phông nền</h3>
                      <BackgroundSelector options={constants.BACKGROUND_OPTIONS} selectedOption={selectedBackground} onSelect={setSelectedBackground} />
                  </div>
                  <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">Biểu cảm</h3>
                      <ExpressionSelector options={constants.EXPRESSION_OPTIONS} selectedOption={selectedExpression} onSelect={setSelectedExpression} />
                  </div>
                   <div>
                      <h3 className="text-base font-medium text-slate-300 mb-2">
                        Yếu tố không mong muốn (Negative Prompt)
                      </h3>
                      <textarea
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="Ví dụ: tay thừa, nhiều hơn 1 người, chữ ký, logo, hình bị cắt..."
                        className="w-full text-sm px-3 py-2 bg-neutral-800/80 border border-neutral-700/80 rounded-md text-slate-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors h-24 resize-none"
                        aria-label="Yếu tố không mong muốn"
                      />
                    </div>
                </div>
            </div>
            
            <div>
                <h2 className="text-lg font-semibold text-slate-100 mb-3">Bước 3: Chọn Kiểu Dáng</h2>
                <p className="text-sm text-slate-400 mb-4 -mt-1">Chọn một hoặc nhiều phong cách bạn muốn thử nghiệm.</p>
                <PoseSelector
                    poseCategories={constants.POSE_CATEGORIES}
                    selectedPoses={selectedPoses}
                    onPoseToggle={handlePoseToggle}
                    onSelectAll={handleSelectAllPoses}
                    onDeselectAll={handleDeselectAllPoses}
                    onToggleCategory={handleToggleCategorySelection}
                />
            </div>
        </div>
      </div>
    </main>
    </>
  );
}