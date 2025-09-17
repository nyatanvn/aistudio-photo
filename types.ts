export interface Pose {
  id: string;
  name: string;
  prompt: string;
}

export interface PoseCategory {
  name: string;
  poses: Pose[];
}

export interface Framing {
  id: string;
  name: string;
  prompt: string;
}

export interface ImageStyle {
  id: string;
  name: string;
  prompt: string;
}

export interface Background {
  id: string;
  name: string;
  prompt: string;
}

export interface Expression {
  id: string;
  name: string;
  prompt: string;
}

export interface Fidelity {
  id: 'standard' | 'high';
  name: string;
  description: string;
}

export interface GeneratedImage {
  pose: Pose;
  url:string;
  customPrompt: string;
  isLoading: boolean;
}

export interface ToolConstants {
    POSE_CATEGORIES: PoseCategory[];
    FRAMING_OPTIONS: Framing[];
    IMAGE_STYLE_OPTIONS: ImageStyle[];
    BACKGROUND_OPTIONS: Background[];
    EXPRESSION_OPTIONS: Expression[];
}

export interface AspectRatio {
  id: '1:1' | '9:16' | '16:9';
  name: string;
  prompt: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  constants: ToolConstants;
  clothingSuggestionPrompt: string;
  buildPrompt: (
    pose: Pose, 
    framing: Framing, 
    style: ImageStyle, 
    background: Background, 
    expression: Expression, 
    customPrompt: string | undefined,
    hasClothingReference: boolean,
    negativePrompt: string,
    aspectRatio: AspectRatio,
    fidelity: Fidelity
  ) => string;
}

export interface ImageItem {
  id: string;
  src: string;
}