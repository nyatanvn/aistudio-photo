interface GenerativePart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

export const fileToGenerativePart = (file: File): Promise<GenerativePart> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (base64String) {
            resolve({
                inlineData: {
                    mimeType: file.type,
                    data: base64String,
                },
            });
        } else {
            reject(new Error("Không thể chuyển đổi file thành base64."));
        }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error("Không thể đọc file dưới dạng Data URL."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const compressImage = (file: File, maxWidth: number, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Kiểm tra xem tệp có phải là hình ảnh không
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Tệp không phải là hình ảnh.'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      // Đảm bảo kết quả là một chuỗi trước khi gán
      const result = event.target?.result;
      if (typeof result !== 'string') {
        return reject(new Error('Không thể đọc tệp hình ảnh.'));
      }
      img.src = result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Tính toán kích thước mới nếu ảnh lớn hơn maxWidth
        if (width > maxWidth) {
          const scale = maxWidth / width;
          width = maxWidth;
          height = height * scale;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Không thể lấy context 2D của canvas.'));
        }
        
        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Lấy data URL với chất lượng được chỉ định cho JPEG
        // Đối với các loại khác như PNG, chất lượng sẽ bị bỏ qua nhưng chúng ta mặc định là JPEG để nén
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };

      img.onerror = (error) => reject(new Error(`Không thể tải hình ảnh: ${error}`));
    };

    reader.onerror = (error) => reject(new Error(`Lỗi FileReader: ${error}`));
  });
};

export const padImageToAspectRatio = (imageBase64: string, targetAspectRatioId: '1:1' | '9:16' | '16:9'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageBase64;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Không thể lấy context 2D của canvas.'));
      }

      const { width: originalWidth, height: originalHeight } = img;
      
      let targetWidth: number;
      let targetHeight: number;
      const originalAspectRatio = originalWidth / originalHeight;

      let targetRatio: number;
      if (targetAspectRatioId === '1:1') targetRatio = 1;
      else if (targetAspectRatioId === '9:16') targetRatio = 9 / 16;
      else if (targetAspectRatioId === '16:9') targetRatio = 16 / 9;
      else {
        resolve(imageBase64);
        return;
      }
      
      if (originalAspectRatio > targetRatio) {
        // Original is wider than target, need to add height (black bars top/bottom)
        targetWidth = originalWidth;
        targetHeight = originalWidth / targetRatio;
      } else {
        // Original is taller than target, need to add width (black bars left/right)
        targetHeight = originalHeight;
        targetWidth = originalHeight * targetRatio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const offsetX = (canvas.width - originalWidth) / 2;
      const offsetY = (canvas.height - originalHeight) / 2;
      
      ctx.drawImage(img, offsetX, offsetY, originalWidth, originalHeight);
      
      // Use jpeg to save space and for consistency
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.onerror = (error) => reject(new Error(`Không thể tải hình ảnh từ base64: ${error}`));
  });
};

export const cropImageToAspectRatio = (imageBase64: string, targetAspectRatioId: '1:1' | '9:16' | '16:9'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageBase64;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Không thể lấy context 2D của canvas.'));
      }

      const { width: originalWidth, height: originalHeight } = img;
      const originalAspectRatio = originalWidth / originalHeight;

      let targetRatio: number;
      if (targetAspectRatioId === '1:1') targetRatio = 1;
      else if (targetAspectRatioId === '9:16') targetRatio = 9 / 16;
      else if (targetAspectRatioId === '16:9') targetRatio = 16 / 9;
      else {
        // Fallback for safety, though should not be reached with current types
        resolve(imageBase64);
        return;
      }

      let sx = 0, sy = 0, sWidth = originalWidth, sHeight = originalHeight;

      if (originalAspectRatio > targetRatio) {
        // Image is wider than target, crop sides
        sWidth = originalHeight * targetRatio;
        sx = (originalWidth - sWidth) / 2;
      } else if (originalAspectRatio < targetRatio) {
        // Image is taller than target, crop top/bottom
        sHeight = originalWidth / targetRatio;
        sy = (originalHeight - sHeight) / 2;
      }
      
      canvas.width = sWidth;
      canvas.height = sHeight;
      
      // Draw the cropped portion to the canvas
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
      
      // Use JPEG for consistency and compression
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.onerror = (error) => reject(new Error(`Không thể tải hình ảnh từ base64: ${error}`));
  });
};

// FIX: Added missing 'cropImageToSquare' function that was being imported in HubView.tsx.
export const cropImageToSquare = (imageBase64: string): Promise<string> => {
  return cropImageToAspectRatio(imageBase64, '1:1');
};
