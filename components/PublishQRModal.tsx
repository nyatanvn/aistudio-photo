import React from 'react';

interface PublishQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  newQrCodeBase64: string;
}

export const PublishQRModal: React.FC<PublishQRModalProps> = ({ isOpen, onClose, newQrCodeBase64 }) => {
  if (!isOpen) {
    return null;
  }

  const generateFileContent = (): string => {
    const header = `/**
 * NƠI LƯU TRỮ MÃ QR ỦNG HỘ VĨNH VIỄN - ĐƯỢC TẠO TỰ ĐỘNG
 * ----------------------------------------------------
 * HƯỚNG DẪN DÀNH CHO QUẢN TRỊ VIÊN:
 * Tệp này được tạo tự động khi bạn nhấn "Công Bố" trên trang ủng hộ.
 * Hãy dùng tệp này để thay thế cho tệp cũ có tên 'constants-donation.ts' trong dự án.
 * Ngày tạo: ${new Date().toLocaleString('vi-VN')}
 */`;
    
    // Escape backticks in the base64 string if any, although unlikely
    const safeBase64 = newQrCodeBase64.replace(/`/g, "\\`");

    return `${header}\n\nexport const DONATION_QR_CODE_BASE64: string | null = \`${safeBase64}\`;\n`;
  };


  const handleDownload = () => {
    const fileContent = generateFileContent();
    if (!fileContent) {
        alert("Không thể tạo tệp do thiếu dữ liệu mã QR.");
        return;
    }
    const blob = new Blob([fileContent], { type: 'text/typescript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'constants-donation.ts');
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
            <h2 className="text-2xl font-bold text-slate-100">Công Bố Mã QR Mới</h2>
            <p className="text-sm text-slate-400 mt-2">Để áp dụng mã QR này vĩnh viễn cho **tất cả người dùng**, hãy làm theo các bước sau:</p>
            <ol className="text-sm list-decimal list-inside bg-neutral-900/50 p-4 rounded-lg mt-3 space-y-2 border border-neutral-700">
                <li>Nhấn nút <strong>"Tải Tệp Cấu Hình QR"</strong> bên dưới.</li>
                <li>Một tệp có tên <code className="font-mono bg-neutral-700 text-amber-300 px-1 py-0.5 rounded text-xs">constants-donation.ts</code> sẽ được tải xuống.</li>
                <li>Trong thư mục mã nguồn dự án, tìm và <strong>thay thế tệp cũ</strong> bằng tệp bạn vừa tải về.</li>
                <li>Lưu và triển khai lại ứng dụng của bạn để hoàn tất.</li>
            </ol>
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
                Tải Tệp Cấu Hình QR
            </button>
        </div>
      </div>
    </div>
  );
};