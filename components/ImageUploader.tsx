import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  originalImageUrl: string | null;
}

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-500 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l-3-3m0 0l3-3m-3 3h12" />
  </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, originalImageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    try {
      const file = input.files?.[0];
      if (file) {
        onImageChange(file);
      }
    } finally {
      // QUAN TRỌNG: Đặt lại giá trị của input.
      // Thao tác này cho phép người dùng chọn lại cùng một tệp tin và kích hoạt lại sự kiện onChange.
      // Nếu không có dòng này, việc chọn cùng một tệp hai lần liên tiếp sẽ không hoạt động.
      input.value = '';
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div
      className="group relative w-full max-w-sm mx-auto aspect-square border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center text-center cursor-pointer hover:border-amber-500 transition-all duration-300 bg-neutral-950/50 hover:shadow-lg hover:shadow-amber-500/10"
      onClick={handleClick}
      role="button"
      aria-label="Tải ảnh lên"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      {originalImageUrl ? (
        <>
          <img src={originalImageUrl} alt="Bản xem trước" className="object-cover w-full h-full rounded-lg" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
             <p className="text-white font-semibold">Thay đổi ảnh</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center text-neutral-400">
            <UploadIcon />
            <p className="mt-2 font-semibold">Nhấn để tải lên</p>
            <p className="text-xs text-neutral-500">hoặc kéo và thả</p>
        </div>
      )}
    </div>
  );
};
