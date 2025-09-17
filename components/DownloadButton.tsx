import React from 'react';

interface DownloadButtonProps {
  imageUrl: string;
  poseName: string;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, poseName }) => {
  if (!imageUrl) return null;

  // Create a user-friendly filename
  const filename = `chan-dung-ai-${poseName.toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <a
      href={imageUrl}
      download={filename}
      className="flex items-center gap-2 bg-neutral-800/70 text-white py-2 px-3 rounded-full text-sm font-medium backdrop-blur-sm border border-neutral-700 hover:bg-neutral-700 transition-colors"
      title="Tải xuống ảnh"
    >
      <DownloadIcon />
      <span>Tải xuống</span>
    </a>
  );
};