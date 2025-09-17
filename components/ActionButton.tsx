import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  selectedCount: number;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM3.293 8.707a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0zm10 0a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l3 3a1 1 0 010 1.414zM9 11a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1H7a1 1 0 010-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
    <path d="M3.5 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16.5 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);


export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, isLoading, disabled, selectedCount }) => {
  const buttonText = selectedCount > 0 
    ? `Tạo ${selectedCount} Chân Dung`
    : 'Chọn Kiểu Dáng';

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-transparent text-base font-bold rounded-full text-neutral-900 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-amber-500 shadow-lg hover:shadow-amber-500/30 transform hover:scale-105"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-neutral-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Đang xử lý...
        </>
      ) : (
        <>
          <SparklesIcon className="w-5 h-5" />
          {buttonText}
        </>
      )}
    </button>
  );
};