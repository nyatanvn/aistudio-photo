

import React from 'react';
import type { GeneratedImage } from '../types';
import { DownloadButton } from './DownloadButton';

const RegenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
);

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400/50" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const Spinner: React.FC = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
);

interface ResultCardProps {
  image: GeneratedImage;
  onRegenerate: () => void;
  onPromptChange: (prompt: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ image, onRegenerate, onPromptChange }) => {
  const hasImage = !!image.url;
  const hasFailed = !image.isLoading && !image.url;

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300">
      <div className="relative w-full bg-neutral-950 flex items-center justify-center">
        {image.isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400 bg-black/30 z-10">
                <Spinner />
                <p className="mt-2 text-sm">Đang tạo...</p>
            </div>
        )}
        {hasFailed && (
            <div className="flex flex-col items-center justify-center text-center text-neutral-500 p-4 aspect-square">
                <ErrorIcon />
                <p className="mt-2 text-sm font-medium text-red-400">Tạo ảnh thất bại</p>
                <p className="text-xs">Vui lòng thử tạo lại.</p>
            </div>
        )}
        {hasImage && <img src={image.url} alt={image.pose.name} className="w-full h-auto object-contain" />}
        
        {hasImage && (
            <div className="absolute top-2 right-2 z-20">
                <DownloadButton imageUrl={image.url} poseName={image.pose.name} />
            </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow bg-neutral-900">
        <p className="font-semibold text-amber-400 text-sm">{image.pose.name}</p>
        <p className="text-xs text-slate-400 mt-1 mb-3 flex-grow">{image.pose.prompt}</p>

        <div className="mt-auto space-y-2">
            <input
                type="text"
                placeholder="Thêm chi tiết (vd: có nụ cười)..."
                value={image.customPrompt}
                onChange={(e) => onPromptChange(e.target.value)}
                disabled={image.isLoading}
                className="w-full text-xs px-3 py-2 bg-neutral-700/60 border border-neutral-600 rounded-md text-slate-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 transition-colors"
            />
            <button
                onClick={onRegenerate}
                disabled={image.isLoading}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-transparent text-xs font-semibold rounded-md text-amber-300 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-amber-500"
            >
                <RegenerateIcon />
                <span>{image.isLoading ? 'Đang tạo...' : 'Tạo Lại'}</span>
            </button>
        </div>
      </div>
    </div>
  );
};