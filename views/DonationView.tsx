import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { PublishQRModal } from '../components/PublishQRModal';
import { compressImage } from '../utils/fileUtils';
import { DONATION_QR_CODE_BASE64 } from '../constants-donation';


interface DonationViewProps {
  onBackToHub: () => void;
  isAdmin: boolean;
}

const BackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export default function DonationView({ onBackToHub, isAdmin }: DonationViewProps): React.ReactElement {
    const [qrCodeSrc, setQrCodeSrc] = useState<string | null>(null);
    const [newQrCodePreview, setNewQrCodePreview] = useState<string | null>(null);
    const [isPublishModalOpen, setPublishModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        // Load QR from the permanent constant file
        setQrCodeSrc(DONATION_QR_CODE_BASE64);
        setIsLoading(false);
    }, []);
    
    const handleQRChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                // Compress the image to get a base64 string for preview
                const compressedQR = await compressImage(file, 512, 0.9);
                setNewQrCodePreview(compressedQR);
            } catch (error) {
                console.error("Lỗi khi xử lý mã QR:", error);
                alert("Không thể tải lên mã QR. Vui lòng thử lại.");
            }
        }
        // Reset input to allow re-uploading the same file
        event.target.value = '';
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };


    return (
        <>
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
             <button 
                onClick={onBackToHub}
                className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-neutral-800"
            >
                <BackIcon />
                Quay Lại
            </button>
            <div className="w-full max-w-md text-center">
                <Header 
                    title="Mời tôi ly cà phê" 
                    description="Nếu bạn thấy công cụ này hữu ích, hãy ủng hộ để giúp tác giả duy trì và phát triển dự án nhé. Xin cảm ơn!"
                />

                <div className="mt-8 aspect-square w-full max-w-sm mx-auto bg-neutral-900 border-2 border-neutral-700 rounded-lg flex items-center justify-center p-4 shadow-lg">
                    {isLoading ? (
                        <p className="text-slate-400">Đang tải mã QR...</p>
                    ) : (newQrCodePreview || qrCodeSrc) ? (
                        <img src={newQrCodePreview || qrCodeSrc} alt="Mã QR ủng hộ" className="object-contain w-full h-full rounded-md" />
                    ) : (
                         <div className="text-neutral-500">
                             <p className="font-semibold">Chưa có mã QR nào được thiết lập.</p>
                             <p className="text-sm mt-1">{isAdmin ? "Nhấn nút bên dưới để tải lên." : "Vui lòng vào chế độ quản trị để cài đặt."}</p>
                         </div>
                    )}
                </div>
                
                 {isAdmin && (
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleQRChange}
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            aria-hidden="true"
                        />
                        <button
                            onClick={handleUploadClick}
                            className="bg-neutral-700 text-slate-200 font-bold py-2 px-5 rounded-full hover:bg-neutral-600 transition-colors text-sm"
                        >
                           {newQrCodePreview ? 'Tải Lên Mã QR Khác' : 'Tải Lên Mã QR Mới'}
                        </button>
                         {newQrCodePreview && (
                             <button
                                onClick={() => setPublishModalOpen(true)}
                                className="bg-amber-500 text-neutral-900 font-bold py-2 px-5 rounded-full hover:bg-amber-400 transition-colors text-sm animate-pulse"
                            >
                                Công Bố Mã QR Mới...
                            </button>
                         )}
                    </div>
                )}
            </div>
        </main>
        
        <PublishQRModal
            isOpen={isPublishModalOpen}
            onClose={() => setPublishModalOpen(false)}
            newQrCodeBase64={newQrCodePreview || ''}
        />
        </>
    );
}