import React, { useState, useEffect } from 'react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title: string;
  instructions: React.ReactElement;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, code, title, instructions }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }, (err) => {
      console.error('Không thể sao chép: ', err);
      alert('Không thể sao chép tự động. Vui lòng sao chép thủ công.');
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl p-8 w-full max-w-2xl m-4 relative transform transition-all flex flex-col max-h-[80vh]">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-neutral-500 hover:text-white transition-colors"
          aria-label="Đóng"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-left flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            {instructions}
        </div>
        <div className="mt-4 flex-grow flex flex-col min-h-0">
            <textarea
              value={code}
              readOnly
              className="w-full h-full px-4 py-3 bg-neutral-900 border border-neutral-600 rounded-lg text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors text-xs font-mono resize-none"
              onFocus={(e) => e.target.select()}
            />
        </div>
        <div className="mt-4 flex-shrink-0">
             <button
                type="button"
                onClick={handleCopy}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full text-neutral-900 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-amber-500"
              >
                {isCopied ? 'Đã Sao Chép!' : 'Sao Chép Mã'}
            </button>
        </div>
      </div>
    </div>
  );
};