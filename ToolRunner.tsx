import React, { useState, useCallback } from 'react';
import type { Pose, Framing, ImageStyle, Background, Expression, Tool, ImageItem, AspectRatio, Fidelity } from './types';
import EditorView from './views/EditorView';
import ResultsView from './views/ResultsView';
import { ASPECT_RATIO_OPTIONS } from './constants-aspect-ratio';
import { FIDELITY_OPTIONS } from './constants-fidelity';

interface ToolRunnerProps {
    tool: Tool;
    onBackToHub: () => void;
    clothingLibrary: ImageItem[];
    setClothingLibrary: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const BackToHubButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 z-50 flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-full bg-neutral-900/50 hover:bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50"
      title="Quay về trang chủ"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 4.414V17a1 1 0 102 0V4.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span>Tất Cả Công Cụ</span>
    </button>
);


export default function ToolRunner({ tool, onBackToHub, clothingLibrary, setClothingLibrary }: ToolRunnerProps): React.ReactElement {
  const [view, setView] = useState<'editor' | 'results'>('editor');
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [selectedPoses, setSelectedPoses] = useState<Pose[]>([]);
  
  // Initialize state with the first option from the tool's constants
  const [selectedFraming, setSelectedFraming] = useState<Framing>(tool.constants.FRAMING_OPTIONS[0]);
  const [selectedImageStyle, setSelectedImageStyle] = useState<ImageStyle>(tool.constants.IMAGE_STYLE_OPTIONS[0]);
  const [selectedBackground, setSelectedBackground] = useState<Background>(tool.constants.BACKGROUND_OPTIONS[0]);
  const [selectedExpression, setSelectedExpression] = useState<Expression>(tool.constants.EXPRESSION_OPTIONS[0]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>(ASPECT_RATIO_OPTIONS[0]);
  const [selectedFidelity, setSelectedFidelity] = useState<Fidelity>(FIDELITY_OPTIONS[0]);

  // New state for clothing reference
  const [clothingMode, setClothingMode] = useState<'auto' | 'reference'>('auto');
  const [clothingReferenceImage, setClothingReferenceImage] = useState<string | null>(null);

  // New state for negative prompt
  const [negativePrompt, setNegativePrompt] = useState<string>('');


  const handleGenerate = (file: File, poses: Pose[], framing: Framing, style: ImageStyle, background: Background, expression: Expression, mode: 'auto' | 'reference', refImage: string | null, negPrompt: string, aspectRatio: AspectRatio, fidelity: Fidelity) => {
    setOriginalImageFile(file);
    setSelectedPoses(poses);
    setSelectedFraming(framing);
    setSelectedImageStyle(style);
    setSelectedBackground(background);
    setSelectedExpression(expression);
    setClothingMode(mode);
    setClothingReferenceImage(refImage);
    setNegativePrompt(negPrompt);
    setSelectedAspectRatio(aspectRatio);
    setSelectedFidelity(fidelity);
    setView('results');
  };

  const handleBackToEditor = () => {
    setView('editor');
  };

  const buildPromptForTool = useCallback((pose: Pose, customPrompt: string = '') => {
      const hasClothingReference = clothingMode === 'reference' && !!clothingReferenceImage;
      return tool.buildPrompt(pose, selectedFraming, selectedImageStyle, selectedBackground, selectedExpression, customPrompt, hasClothingReference, negativePrompt, selectedAspectRatio, selectedFidelity);
  }, [tool, selectedFraming, selectedImageStyle, selectedBackground, selectedExpression, clothingMode, clothingReferenceImage, negativePrompt, selectedAspectRatio, selectedFidelity]);
  
  return (
    <div className="relative">
      {view === 'editor' && <BackToHubButton onClick={onBackToHub} />}
      {view === 'editor' && (
        <EditorView
          toolName={tool.name}
          toolDescription={tool.description}
          constants={tool.constants}
          clothingSuggestionPrompt={tool.clothingSuggestionPrompt}
          initialImageFile={originalImageFile}
          initialSelectedPoses={selectedPoses}
          initialSelectedFraming={selectedFraming}
          initialSelectedImageStyle={selectedImageStyle}
          initialSelectedBackground={selectedBackground}
          initialSelectedExpression={selectedExpression}
          initialClothingMode={clothingMode}
          initialClothingReferenceImage={clothingReferenceImage}
          initialNegativePrompt={negativePrompt}
          initialSelectedAspectRatio={selectedAspectRatio}
          initialSelectedFidelity={selectedFidelity}
          clothingLibrary={clothingLibrary}
          setClothingLibrary={setClothingLibrary}
          onGenerate={handleGenerate}
        />
      )}
      {view === 'results' && originalImageFile && (
        <ResultsView
          originalImageFile={originalImageFile}
          selectedPoses={selectedPoses}
          toolName={tool.name}
          buildPrompt={buildPromptForTool}
          onBackToEditor={handleBackToEditor}
          clothingReferenceImage={clothingReferenceImage}
          selectedAspectRatio={selectedAspectRatio}
        />
      )}
    </div>
  );
}