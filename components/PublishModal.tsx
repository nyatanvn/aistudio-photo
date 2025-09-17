import React, { useState, useEffect } from 'react';
import type { Tool } from '../types';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTools: Tool[]; // Pass initial tools to maintain order and structure
  allOverrides: any;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, initialTools, allOverrides }) => {
  const [generatedCode, setGeneratedCode] = useState('');

  const generateOverridesCode = (overrides: any): string => {
    const header = `import type { Tool } from './types';

/**
 * FILE CẤU HÌNH CHO QUẢN TRỊ VIÊN - ĐƯỢỢC TẠO TỰ ĐỘNG
 * ---------------------------------
 * HƯỚNG DẪN: Tệp này chứa các thay đổi vĩnh viễn của bạn. Hãy thay thế tệp cũ trong dự án bằng tệp này.
 * Ngày tạo: ${new Date().toLocaleString('vi-VN')}
 */

type CustomOverrides = { [toolId:string]: Partial<Pick<Tool, 'name' | 'imageUrl'>> };

export const CUSTOM_OVERRIDES: CustomOverrides = {
`;
    const footer = `
};
`;

    const toolOverrideEntries = initialTools
      .map(tool => {
        const overrideData = overrides[tool.id];
        if (overrideData && (overrideData.name || overrideData.imageUrl)) {
          const properties = [];
          if (overrideData.name) {
            properties.push(`    name: \`${overrideData.name.replace(/`/g, "\\`")}\``);
          }
          if (overrideData.imageUrl) {
            properties.push(`    imageUrl: \`${overrideData.imageUrl.replace(/`/g, "\\`")}\``);
          }
          return `  '${tool.id}': {\n${properties.join(',\n')}\n  }`;
        }
        return null;
      })
      .filter(Boolean);

    if (toolOverrideEntries.length === 0) {
      return header + '  // Không có thay đổi nào được công bố.' + footer;
    }
    
    return header + toolOverrideEntries.join(',\n') + footer;
  };


  useEffect(() => {
    if (isOpen) {
      try {
        const code = generateOverridesCode(allOverrides);
        setGeneratedCode(code);
      } catch (e) {
        console.error("Lỗi khi tạo mã công bố:", e);
        setGeneratedCode("Lỗi: Không thể tạo mã từ dữ liệu thay đổi.");
      }
    }
  }, [isOpen, initialTools, allOverrides]);

  if (!isOpen) {
    return null;
  }

  const handleDownload = () => {
     if (!generatedCode || generatedCode.startsWith("Lỗi:")) {
        alert("Không thể tạo tệp do có lỗi trong dữ liệu.");
        return;
    }
    const blob = new Blob([generatedCode], { type: 'text/typescript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'custom-tool-overrides.ts');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
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
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl p-8 w-full max-w-2xl m-4 relative transform transition-all flex flex-col max-h-[85vh]">
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
            <h2 className="text-2xl font-bold text-slate-100">Công Bố Thay Đổi</h2>
            <p className="text-sm text-slate-400 mt-2">Để áp dụng các thay đổi này vĩnh viễn cho **tất cả người dùng**, hãy làm theo các bước sau:</p>
            <ol className="text-sm list-decimal list-inside bg-neutral-900/50 p-4 rounded-lg mt-3 space-y-2 border border-neutral-700">
                <li>Nhấn nút <strong>"Tải Tệp Cấu Hình"</strong> bên dưới.</li>
                <li>Một tệp có tên <code className="font-mono bg-neutral-700 text-amber-300 px-1 py-0.5 rounded text-xs">custom-tool-overrides.ts</code> sẽ được tải xuống.</li>
                <li>Trong thư mục mã nguồn dự án, tìm và <strong>thay thế tệp cũ</strong> bằng tệp bạn vừa tải về.</li>
                <li>Lưu và triển khai lại ứng dụng của bạn để hoàn tất.</li>
            </ol>
            <p className="text-xs text-slate-500 mt-3">Thao tác này sẽ loại bỏ việc sao chép/dán thủ công, đảm bảo cập nhật chính xác.</p>
        </div>
       
        <div className="mt-6 flex-shrink-0">
             <button
                type="button"
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-bold rounded-full text-neutral-900 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-amber-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Tải Tệp Cấu Hình
            </button>
        </div>
      </div>
    </div>
  );
};
