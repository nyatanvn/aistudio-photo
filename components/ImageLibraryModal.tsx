import React, { useRef } from 'react';
import { compressImage } from '../utils/fileUtils';

interface ImageItem {
    id: string;
    src: string;
}

interface ImageLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageLibrary: ImageItem[];
  onSelectImage: (imageBase64: string) => void;
  onAddToLibrary: (imagesBase64: string[]) => void;
  onDeleteFromLibrary: (id: string) => void;
  onGetCode: (imageBase64: string) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const CodeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const ImageLibraryModal: React.FC<ImageLibraryModalProps> = ({ 
    isOpen, 
    onClose, 
    imageLibrary, 
    onSelectImage,
    onAddToLibrary,
    onDeleteFromLibrary,
    onGetCode,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const files = input.files;
    try {
        if (!files || files.length === 0) {
            return;
        }

        const successfulUploads: string[] = [];
        const failedUploads: string[] = [];

        // Xử lý từng file một
        for (const file of Array.from(files)) {
            try {
                // Giới hạn kích thước file gốc là 10MB
                if (file.size > 10 * 1024 * 1024) {
                    failedUploads.push(`${file.name} (quá lớn > 10MB)`);
                    continue;
                }
                // Nén ảnh để lưu trữ trong thư viện, giúp tiết kiệm dung lượng localStorage
                // Chiều rộng tối đa 512px, chất lượng 80% là đủ cho ảnh xem trước
                const compressedBase64 = await compressImage(file, 512, 0.8);
                successfulUploads.push(compressedBase64);
            } catch (error) {
                console.error(`Lỗi khi xử lý file: ${file.name}`, error);
                failedUploads.push(`${file.name} (lỗi xử lý)`);
            }
        }

        // Thêm các ảnh đã xử lý thành công vào thư viện
        if (successfulUploads.length > 0) {
            onAddToLibrary(successfulUploads);
        }

        // Thông báo cho người dùng về các file bị lỗi
        if (failedUploads.length > 0) {
            alert(`Lỗi: Không thể tải lên ${failedUploads.length} tệp:\n- ${failedUploads.join('\n- ')}`);
        }
    } catch (error) {
        console.error("Lỗi khi xử lý các tệp đã chọn:", error);
        alert("Đã xảy ra lỗi không mong muốn khi tải tệp lên.");
    } finally {
        // QUAN TRỌNG: Đặt lại giá trị của input.
        // Thao tác này cho phép người dùng chọn lại cùng một tệp tin và kích hoạt lại sự kiện onChange.
        // Nếu không có dòng này, việc chọn cùng một tệp hai lần liên tiếp sẽ không hoạt động.
        input.value = '';
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
        aria-labelledby="library-modal-title"
    >
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl p-6 w-full max-w-4xl m-4 h-[80vh] flex flex-col">
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            multiple
            aria-hidden="true"
        />
        <div className="flex-shrink-0 flex justify-between items-center mb-4">
            <div>
                <h2 id="library-modal-title" className="text-xl font-bold text-slate-100">Thư Viện Ảnh</h2>
                <p className="text-sm text-slate-400">Chọn ảnh có sẵn hoặc tải lên ảnh mới.</p>
            </div>
            <div className="flex items-center gap-4">
                 <button
                    onClick={handleUploadClick}
                    className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-bold rounded-full text-neutral-900 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300"
                    aria-label="Tải ảnh mới lên thư viện"
                >
                    <UploadIcon />
                    Tải Ảnh Mới
                </button>
                <button 
                    onClick={onClose} 
                    className="text-neutral-500 hover:text-white transition-colors"
                    aria-label="Đóng"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        
        {/* Vùng chứa lưới ảnh có thể cuộn */}
        <div className="flex-grow overflow-y-auto -mx-2 pr-2">
            {imageLibrary.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
                    {imageLibrary.map((image, index) => (
                        <div key={image.id} className="group relative aspect-square rounded-lg overflow-hidden shadow-md"
                             role="button"
                             tabIndex={0}
                             aria-label={`Ảnh ${index + 1} trong thư viện. Nhấn để chọn.`}
                             onClick={() => onSelectImage(image.src)}
                             onKeyDown={(e) => e.key === 'Enter' && onSelectImage(image.src)}
                        >
                            <img 
                                src={image.src} 
                                alt={`Ảnh trong thư viện số ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div 
                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                aria-hidden="true"
                            >
                                <span className="text-white font-semibold">Chọn Ảnh</span>
                            </div>
                            <div className="absolute top-1 right-1 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Ngăn sự kiện click lan tới div cha
                                        onGetCode(image.src);
                                    }}
                                    className="p-1.5 bg-black/50 text-white rounded-full hover:bg-sky-500 transition-all"
                                    title="Lấy mã Base64 để cập nhật vĩnh viễn"
                                    aria-label="Lấy mã Base64 của ảnh"
                                >
                                   <CodeIcon />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Ngăn sự kiện click lan tới div cha
                                        if(window.confirm("Bạn có chắc muốn xóa ảnh này khỏi thư viện? (Hành động này chỉ xóa khỏi bộ nhớ trình duyệt của bạn)")) {
                                            onDeleteFromLibrary(image.id)
                                        }
                                    }}
                                    className="p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-all"
                                    title="Xóa ảnh (khỏi bộ nhớ cục bộ)"
                                    aria-label="Xóa ảnh khỏi thư viện"
                                >
                                   <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Trạng thái khi thư viện trống
                <div className="w-full h-full flex flex-col items-center justify-center text-center text-neutral-500 border-2 border-dashed border-neutral-700 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-4 font-semibold text-slate-300">Thư viện của bạn đang trống</h3>
                    <p className="text-sm">Hãy tải lên ảnh đầu tiên để bắt đầu.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};