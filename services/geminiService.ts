import { GoogleGenAI, Modality } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateImageFromText(prompt: string): Promise<string | null> {
    try {
        const fullPrompt = `professional high-resolution studio photograph of a single piece of clothing on an invisible mannequin, clean white background, fashion magazine quality. Clothing description: ${prompt}`;
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return `data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi gọi Gemini API để tạo ảnh:", error);
        throw new Error("Không thể tạo hình ảnh trang phục qua Gemini API.");
    }
}


export async function editImageWithGemini(
  base64PersonImageData: string,
  personMimeType: string,
  prompt: string,
  base64ClothingDataUrl?: string | null
): Promise<string | null> {
  try {
    const model = 'gemini-2.5-flash-image-preview';

    // 1. Ảnh gốc luôn là phần đầu tiên
    const parts: any[] = [
      {
        inlineData: {
          data: base64PersonImageData,
          mimeType: personMimeType,
        },
      },
    ];
    
    // 2. Ảnh trang phục (nếu có) là phần tiếp theo
    if (base64ClothingDataUrl) {
        const match = base64ClothingDataUrl.match(/^data:(image\/.+);base64,(.+)$/);
        if (match) {
            const mimeType = match[1];
            const data = match[2];
            parts.push({
              inlineData: { data, mimeType },
            });
        }
    }
    
    // 3. Prompt văn bản là phần cuối cùng
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Tìm phần hình ảnh trong phản hồi
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data; // Trả về chuỗi base64 của ảnh
        }
      }
    }
    
    // Nếu không có ảnh nào được trả về, trả về null hoặc báo lỗi
    return null;

  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    throw new Error("Không thể xử lý hình ảnh qua Gemini API. Vui lòng kiểm tra console để biết thêm chi tiết.");
  }
}