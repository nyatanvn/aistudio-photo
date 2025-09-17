import React, { useState, useEffect, useRef } from 'react';
import type { Tool, Pose, Framing, ImageStyle, Background, Expression, ImageItem, AspectRatio } from '../types';
import { Header } from '../components/Header';
import { ToolCard } from '../components/ToolCard';
import { AdminLoginModal } from '../components/AdminLoginModal';
import { ImageLibraryModal } from '../components/ImageLibraryModal';
import { PublishModal } from '../components/PublishModal';
import { CodeModal } from '../components/CodeModal';
import { cropImageToSquare } from '../utils/fileUtils';
import * as StudioConstants from '../constants';
import * as TrungThuConstants from '../constants-trungthu';
import * as UnderwaterConstants from '../constants-underwater';
import * as RedSoireeConstants from '../constants-red-soiree';
import * as PrincessDreamConstants from '../constants-princess-dream';
import * as AngelDanceConstants from '../constants-angel-dance';
import * as JellyfishFairyConstants from '../constants-jellyfish-fairy';
import * as PearlGoddessConstants from '../constants-pearl-goddess';
import * as BlueLotusGoddessConstants from '../constants-blue-lotus-goddess';
import * as SilkGoddessConstants from '../constants-silk-goddess';
import * as GoldfishDreamConstants from '../constants-goldfish-dream';
import * as LuminousFlowersConstants from '../constants-luminous-flowers';
import { CUSTOM_OVERRIDES } from '../custom-tool-overrides';


const buildStudioPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**2. Trang phục:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu. Giữ nguyên kiểu dáng, màu sắc và chi tiết của trang phục đó.`
      : `**2. Trang phục:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc áo cổ lọ tối màu, cổ điển, tối giản hoặc một chiếc áo phông đơn giản. Đây là yêu cầu bắt buộc.`;
    
    const faceInstruction = `**YÊU CẦU BẮT BUỘC:** Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.`;
      
    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
${faceInstruction}
**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh chân dung nghệ thuật chuyên nghiệp, đen trắng, chụp trong studio.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Bố cục và Khung Hình:** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**3. Phong cách & Ánh sáng:** ${style.prompt}.
**4. Phông nền:** ${background.prompt}.
**5. Biểu cảm:** ${expression.prompt}.
**6. Tư thế:** ${pose.prompt}.
---
**LƯU Ý:** Ưu tiên thay đổi trang phục và giữ bố cục đúng như yêu cầu.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildVietnameseArtPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu. Giữ nguyên kiểu dáng, màu sắc và chi tiết của trang phục đó, đảm bảo trang phục có chất liệu cao cấp như lụa, gấm, với chi tiết tinh xảo.`
      : `**3. Trang phục:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc áo yếm lụa màu đỏ truyền thống của Việt Nam và một chiếc váy lụa đen mềm mại. Đây là yêu-cầu-bắt-buộc.`;

    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;

    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh thời trang chuyên nghiệp, siêu thực, sắc nét như chụp bằng máy ảnh DSLR ống kính 85mm f/1.2.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách hoạt hình.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật thời trang cao cấp (high-fashion) mang đậm tinh thần và vẻ đẹp Việt Nam, lấy cảm hứng từ không khí lễ hội.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Phong cách & Ánh sáng:** ${style.prompt}. Ánh sáng phải tôn lên vẻ đẹp của chủ thể và trang phục, tạo khối rõ ràng.
**2. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền (Background):** ${background.prompt}. Phông nền phải có chiều sâu, hỗ trợ làm nổi bật chủ thể.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, mang đẳng cấp của một tạp chí thời trang, không phải tranh vẽ hay ảnh 3D.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**8. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildUnderwaterPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**4. Trang phục:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu. Trang phục phải mỏng, nhẹ và chuyển động mềm mại theo dòng nước.`
      : `**4. Trang phục:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc váy mỏng, thanh tao, làm từ vải voan trắng hoặc xanh nhạt, có thể chuyển động mềm mại dưới nước. Đây là yêu-cầu-bắt-buộc.`;
      
    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;

    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh nghệ thuật (fine-art photography), siêu thực, sắc nét như chụp bằng máy ảnh DSLR ống kính 50mm f/1.4.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách hoạt hình/3D.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật chụp dưới nước, mang phong cách thanh tao, mơ mộng và huyền ảo.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Bối cảnh chung:** Chủ thể đang ở dưới mặt nước trong một không gian tĩnh lặng.
**2. Phong cách & Ánh sáng:** ${style.prompt}. Ánh sáng phải mềm mại, tôn lên làn da trong trẻo.
**3. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**5. Phông nền & Chi tiết:** ${background.prompt}.
**6. Biểu cảm (Expression):** ${expression.prompt}.
**7. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, mang cảm giác thanh tao, nhẹ nhàng, không có bất kỳ yếu tố nào gây sợ hãi hoặc u tối.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**8. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildRedSoireePrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu.`
      : `**3. Trang phục:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc váy lụa hai dây (slip dress) màu đỏ quyến rũ, gợi cảm, mang phong cách Hollywood cổ điển. Đây là yêu-cầu-bắt-buộc.`;

    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;
        
    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh thời trang chuyên nghiệp, siêu thực, sắc nét như chụp bằng máy ảnh DSLR ống kính 85mm f/1.2.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách hoạt hình.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật thời trang cao cấp (high-fashion) mang concept "Dạ Tiệc Đỏ", toát lên vẻ quyến rũ, sang trọng và có chút hoài cổ.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Phong cách & Ánh sáng:** ${style.prompt}.
**2. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền (Background):** ${background.prompt}.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, mang đẳng cấp của một tạp chí thời trang, không phải tranh vẽ hay ảnh 3D.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildPrincessDreamPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu.`
      : `**3. Trang phục:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc váy công chúa ngọt ngào, tay phồng, màu hồng pastel, được tô điểm bằng ruy băng và nơ. Đây là yêu-cầu-bắt-buộc.`;

    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;

    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh chân dung nghệ thuật, siêu thực, sắc nét như chụp bằng máy ảnh DSLR ống kính 50mm f/1.4.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách hoạt hình.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật mang concept "Giấc Mơ Công Chúa", toát lên vẻ ngọt ngào, trong trẻo và mộng mơ như một bữa tiệc sinh nhật.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Phong cách & Ánh sáng:** ${style.prompt}.
**2. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền (Background):** ${background.prompt}.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, trong trẻo và tươi sáng, không có yếu tố u tối.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildAngelDancePrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu.`
      : `**3. Trang phục:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một bộ trang phục ballet màu trắng duyên dáng với áo leotard và váy xòe bằng vải tuyn. Đây là yêu-cầu-bắt-buộc.`;
    
    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;
      
    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh nghệ thuật (fine-art photography), siêu thực, sắc nét như chụp bằng máy ảnh DSLR.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách hoạt hình/3D.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật mang concept "Vũ Điệu Thiên Thần", lấy cảm hứng từ ballet, toát lên vẻ thanh thoát, bay bổng và kỳ ảo.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Phong cách & Ánh sáng:** ${style.prompt}.
**2. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền (Background):** ${background.prompt}.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, có chiều sâu nghệ thuật, tập trung vào vẻ đẹp hình thể và sự uyển chuyển.`;
    
    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildJellyfishFairyPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục & Phụ kiện:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu.`
      : `**3. Trang phục & Phụ kiện:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc váy thanh tao, phát quang sinh học, trong mờ với những dải tua rua dài bay bổng như xúc tu sứa, mang các sắc thái óng ánh của xanh dương, tím và hồng. Đây là yêu-cầu-bắt-buộc.`;
      
    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;
        
    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh nghệ thuật kỳ ảo (fantasy art photography), siêu thực, sắc nét như chụp bằng máy ảnh DSLR ống kính 85mm f/1.4.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách 3D.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật mang concept "Tiên Nữ Sứa Biển", toát lên vẻ đẹp kỳ ảo, phát quang và huyền bí.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Bối cảnh chung:** Chủ thể đang trôi nổi trong một không gian tối, sâu thẳm như đáy đại dương hoặc vũ trụ.
**2. Phong cách & Ánh sáng:** ${style.prompt}.
**3. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền & Chi tiết:** ${background.prompt}.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, có chiều sâu nghệ thuật và ma mị, không phải hoạt hình.`;
    
    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildPearlGoddessPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục & Phụ kiện:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu.`
      : `**3. Trang phục & Phụ kiện:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc váy dạ hội đen hoặc màu sẫm, chất liệu ren hoặc lụa, kết hợp với trang sức ngọc trai lộng lẫy trên đầu, cổ và tay. Đây là yêu-cầu-bắt-buộc.`;
      
    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;
        
    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh chân dung nghệ thuật (fine-art portrait photography), siêu thực, sắc nét như chụp bằng máy ảnh DSLR ống kính 85mm f/1.2.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách 3D.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật mang concept "Nữ Thần Ngọc Trai", toát lên vẻ đẹp ma mị, sang trọng và bí ẩn của hoàng gia trong bóng tối.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Bối cảnh chung:** Một không gian nội thất cổ điển, sang trọng nhưng u tối.
**2. Phong cách & Ánh sáng:** ${style.prompt}.
**3. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền & Chi tiết:** ${background.prompt}.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, có chiều sâu nghệ thuật, không phải ảnh hoạt hình.`;
    
    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildBlueLotusGoddessPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục & Phụ kiện:** Phải áp dụng trang phục từ hình ảnh tham khảo thứ hai lên người mẫu.`
      : `**3. Trang phục & Phụ kiện:** Thay-thế-trang-phục-gốc bằng trang-phục-phù-hợp-với-concept: một chiếc váy lụa màu xanh lam ngọc bích, nhẹ nhàng bay bổng, có các chi tiết hoa sen và trang sức màu bạc. Đây là yêu-cầu-bắt-buộc.`;
      
    const faceInstruction = `**Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.**`;
        
    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh phải là nhiếp ảnh nghệ thuật (fine-art photography), siêu thực, sắc nét như chụp bằng máy ảnh DSLR.** Tuyệt đối không tạo ra ảnh bị giả, mờ, hoặc theo phong cách hoạt hình/3D.

**Nhiệm vụ:** Chuyển đổi ảnh gốc thành một bức ảnh nghệ thuật mang concept "Nữ Thần Thanh Liên", toát lên vẻ đẹp thanh khiết, thoát tục và huyền ảo.
---
**HƯỚNG DẪN CHI TIẾT (PHẢI TUÂN THỦ NGHIÊM NGẶT):**
**1. Phong cách & Ánh sáng:** ${style.prompt}.
**2. Bố cục (Framing):** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền (Background):** ${background.prompt}.
**5. Biểu cảm (Expression):** ${expression.prompt}.
**6. Tư thế (Pose):** ${pose.prompt}.
---
**LƯU Ý QUAN TRỌNG:** Kết quả cuối cùng phải là một bức ảnh **siêu thực (photorealistic)**, có chiều sâu nghệ thuật, tập trung vào vẻ đẹp thanh tao.`;
    
    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildSilkGoddessPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Áp dụng trang phục từ ảnh tham khảo thứ hai. Giữ nguyên kiểu dáng và màu sắc.`
      : `**3. Trang phục:** Thay thế trang phục gốc bằng một chiếc váy lụa gấm màu xanh ngọc bích với các dải lụa đỏ và cam bay bổng, thắt lưng đỏ bản rộng. Chất liệu phải trông như lụa cao cấp.`;

    const faceInstruction = `**YÊU CẦU QUAN TRỌNG NHẤT:** Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.`;

    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh:** Phải là một bức ảnh nghệ thuật siêu thực (hyperrealistic), chất lượng như chụp bằng máy ảnh DSLR ống kính 85mm f/1.2. Không được trông giống tranh vẽ, 3D hay hoạt hình.

**Nhiệm vụ:** Biến đổi ảnh gốc thành một bức chân dung nghệ thuật của một nữ thần, mang phong cách phương Đông cổ điển, toát lên vẻ quyền lực và thanh tao.
---
**HƯỚNG DẪN CHI TIẾT:**
**1. Chất ảnh & Ánh sáng:** ${style.prompt}. Ánh sáng phải mềm mại nhưng có độ tương phản để tạo khối, tôn lên vẻ đẹp của da và lụa.
**2. Bố cục:** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền:** ${background.prompt}.
**5. Biểu cảm:** ${expression.prompt}.
**6. Tư thế:** ${pose.prompt}.
---
**LƯU Ý:** Kết quả phải là một bức ảnh **siêu thực (photorealistic)**, mang đẳng cấp nghệ thuật cao.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildGoldfishDreamPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Áp dụng trang phục từ ảnh tham khảo thứ hai. Giữ nguyên kiểu dáng và màu sắc.`
      : `**3. Trang phục:** Thay thế trang phục gốc của chủ thể thành một chiếc váy trắng mỏng nhẹ, thướt tha, phù hợp với trẻ em.`;
    
    const subjectInstruction = `**2. Chủ thể:** Chủ thể chính là một cô bé/cậu bé ngây thơ.`;
    
    const faceInstruction = `**YÊU CẦU QUAN TRỌNG NHẤT:** Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc và biến họ thành một đứa trẻ.`;

    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh:** Phải là một bức ảnh kỳ ảo siêu thực (hyperrealistic fantasy photograph), sắc nét, màu sắc sống động. Tuyệt đối không phải tranh vẽ hay 3D.

**Nhiệm vụ:** Biến đổi ảnh gốc thành một cảnh trong mơ: một đứa trẻ đang cưỡi trên lưng một con cá vàng (cá chép) khổng lồ.
---
**HƯỚNG DẪN CHI TIẾT:**
**1. Con cá:** Con cá vàng phải rất lớn, có vảy màu đỏ và trắng rực rỡ, vây và đuôi dài, mềm mại như lụa. Phải có các tia nước bắn ra xung quanh một cách nghệ thuật.
${subjectInstruction}
${clothingInstruction}
**4. Phong cách & Ánh sáng:** ${style.prompt}.
**5. Bố cục:** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
**6. Phông nền:** ${background.prompt}.
**7. Biểu cảm:** ${expression.prompt}.
**8. Tư thế:** ${pose.prompt}.
---
**LƯU Ý:** Toàn bộ bức ảnh phải mang lại cảm giác mộng mơ, trong sáng và vui tươi.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**9. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};

const buildLuminousFlowersPrompt = (pose: Pose, framing: Framing, style: ImageStyle, background: Background, expression: Expression, customPrompt: string = '', hasClothingReference: boolean, negativePrompt: string, aspectRatio: AspectRatio): string => {
    const clothingInstruction = hasClothingReference
      ? `**3. Trang phục:** Áp dụng trang phục từ ảnh tham khảo thứ hai. Giữ nguyên kiểu dáng và màu sắc.`
      : `**3. Trang phục:** Thay thế trang phục gốc bằng một chiếc váy voan mỏng, trong suốt, màu trắng hoặc hồng nhạt, thướt tha và bay bổng. Đây là yêu-cầu-bắt-buộc.`;

    const faceInstruction = `**YÊU CẦU QUAN TRỌNG NHẤT:** Giữ lại 100% các đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc.`;

    const basePrompt = `**YÊU CẦU TỐI THƯỢNG VỀ TỶ LỆ KHUNG HÌNH:** Ảnh kết quả PHẢI có tỷ lệ chính xác là ${aspectRatio.id}. Đây là yêu cầu quan trọng nhất và phải được tuân thủ nghiêm ngặt.
**YÊU CẦU BẮT BUỘC KHÁC:**
- ${faceInstruction}
- **Chất lượng ảnh:** Phải là một bức ảnh nghệ thuật siêu thực (hyperrealistic), chất lượng như chụp bằng máy ảnh DSLR ống kính 85mm f/1.2. Không được trông giống tranh vẽ, 3D hay hoạt hình.

**Nhiệm vụ:** Biến đổi ảnh gốc thành một bức chân dung nghệ thuật của một nàng tiên giữa khu vườn đêm huyền ảo, được bao quanh bởi những đóa hoa khổng lồ phát sáng.
---
**HƯỚNG DẪN CHI TIẾT:**
**1. Chất ảnh & Ánh sáng:** ${style.prompt}. Ánh sáng phải mềm mại, huyền ảo, tập trung vào vẻ đẹp thoát tục của chủ thể.
**2. Bố cục:** ${framing.prompt}. Tỷ lệ khung hình PHẢI là ${aspectRatio.id}. ${aspectRatio.prompt}.
${clothingInstruction}
**4. Phông nền:** ${background.prompt}. Phông nền phải tối và có chiều sâu, làm nổi bật những bông hoa phát sáng.
**5. Biểu cảm:** ${expression.prompt}.
**6. Tư thế:** ${pose.prompt}.
---
**LƯU Ý:** Kết quả phải là một bức ảnh **siêu thực (photorealistic)**, mang đẳng cấp nghệ thuật cao, không khí mơ mộng.`;

    let finalPrompt = customPrompt ? `${basePrompt}\n**7. Tinh chỉnh thêm:** ${customPrompt}` : basePrompt;
    if (negativePrompt.trim()) {
      finalPrompt += `\n---\n**YẾU TỐ LOẠI TRỪ (NEGATIVE PROMPT):** ${negativePrompt.trim()}`;
    }
    return finalPrompt.trim();
};


const INITIAL_TOOLS: Tool[] = [
  {
    id: 'studio',
    name: 'Chân Dung Studio AI',
    description: 'Biến đổi ảnh của bạn thành chân dung nghệ thuật đen trắng với ánh sáng studio chuyên nghiệp và các tư thế tạo dáng chuẩn.',
    imageUrl: CUSTOM_OVERRIDES['studio']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/studio.jpg',
    constants: StudioConstants,
    clothingSuggestionPrompt: 'áo len cổ lọ màu đen',
    buildPrompt: buildStudioPrompt,
  },
  {
    id: 'trungthu',
    name: 'Nàng Thơ Á Đông',
    description: 'Tạo ra những bức ảnh nghệ thuật high-fashion mang đậm tinh thần và vẻ đẹp Việt Nam, trong bối cảnh lễ hội Trung Thu.',
    imageUrl: CUSTOM_OVERRIDES['trungthu']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/trung-thu.jpg',
    constants: TrungThuConstants,
    clothingSuggestionPrompt: 'áo yếm lụa đỏ và váy lụa đen',
    buildPrompt: buildVietnameseArtPrompt,
  },
  {
    id: 'underwater',
    name: 'Nàng Thơ Dưới Nước',
    description: 'Hóa thân thành nàng thơ trong những bức ảnh nghệ thuật dưới nước, mang phong cách thanh tao, mơ mộng và huyền ảo.',
    imageUrl: CUSTOM_OVERRIDES['underwater']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/underwater.jpg',
    constants: UnderwaterConstants,
    clothingSuggestionPrompt: 'váy voan trắng mỏng nhẹ',
    buildPrompt: buildUnderwaterPrompt,
  },
  {
    id: 'red_soiree',
    name: 'Dạ Tiệc Đỏ',
    description: 'Hóa thân thành minh tinh trong một dạ tiệc đỏ quyến rũ, sang trọng, mang phong cách Hollywood cổ điển.',
    imageUrl: CUSTOM_OVERRIDES['red_soiree']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/red-soiree.jpg',
    constants: RedSoireeConstants,
    clothingSuggestionPrompt: 'váy lụa hai dây màu đỏ',
    buildPrompt: buildRedSoireePrompt,
  },
  {
    id: 'princess_dream',
    name: 'Giấc Mơ Công Chúa',
    description: 'Hóa thân thành công chúa trong một bữa tiệc sinh nhật ngọt ngào, với tông màu hồng pastel và không khí mộng mơ.',
    imageUrl: CUSTOM_OVERRIDES['princess_dream']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/princess-dream.jpg',
    constants: PrincessDreamConstants,
    clothingSuggestionPrompt: 'váy công chúa màu hồng pastel tay phồng',
    buildPrompt: buildPrincessDreamPrompt,
  },
   {
    id: 'angel_dance',
    name: 'Vũ Điệu Thiên Thần',
    description: 'Hóa thân thành vũ công ballet thanh thoát, bay bổng trong một không gian nghệ thuật kỳ ảo, lấp lánh.',
    imageUrl: CUSTOM_OVERRIDES['angel_dance']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/angel-dance.jpg',
    constants: AngelDanceConstants,
    clothingSuggestionPrompt: 'bộ trang phục ballet màu trắng với váy xòe bằng vải tuyn',
    buildPrompt: buildAngelDancePrompt,
  },
   {
    id: 'jellyfish_fairy',
    name: 'Tiên Nữ Sứa Biển',
    description: 'Hóa thân thành tiên nữ sứa biển huyền ảo, phát sáng trong không gian đại dương hoặc vũ trụ kỳ ảo.',
    imageUrl: CUSTOM_OVERRIDES['jellyfish_fairy']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/jellyfish-fairy.jpg',
    constants: JellyfishFairyConstants,
    clothingSuggestionPrompt: 'váy phát quang sinh học trong mờ với các dải tua rua dài',
    buildPrompt: buildJellyfishFairyPrompt,
  },
  {
    id: 'pearl_goddess',
    name: 'Nữ Thần Ngọc Trai',
    description: 'Hóa thân thành nữ thần ma mị, sang trọng trong một không gian cổ điển, u tối, với trang sức ngọc trai lộng lẫy.',
    imageUrl: CUSTOM_OVERRIDES['pearl_goddess']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/pearl-goddess.jpg',
    constants: PearlGoddessConstants,
    clothingSuggestionPrompt: 'váy dạ hội đen bằng ren với trang sức ngọc trai',
    buildPrompt: buildPearlGoddessPrompt,
  },
    {
    id: 'blue_lotus_goddess',
    name: 'Nữ Thần Thanh Liên',
    description: 'Hóa thân thành nữ thần thanh khiết, thoát tục trong một không gian huyền ảo với hoa sen xanh và ánh trăng.',
    imageUrl: CUSTOM_OVERRIDES['blue_lotus_goddess']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/blue-lotus-goddess.jpg',
    constants: BlueLotusGoddessConstants,
    clothingSuggestionPrompt: 'váy lụa màu xanh lam ngọc bích với chi tiết hoa sen',
    buildPrompt: buildBlueLotusGoddessPrompt,
  },
  {
    id: 'silk_goddess',
    name: 'Nữ Thần Lụa Gấm',
    description: 'Hóa thân thành nữ thần trong bộ trang phục lụa gấm thướt tha, mang vẻ đẹp cổ điển, quyền lực và đầy nghệ thuật.',
    imageUrl: CUSTOM_OVERRIDES['silk_goddess']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/silk-goddess.jpg',
    constants: SilkGoddessConstants,
    clothingSuggestionPrompt: 'váy lụa gấm màu xanh ngọc bích với dải lụa đỏ',
    buildPrompt: buildSilkGoddessPrompt,
  },
  {
    id: 'goldfish_dream',
    name: 'Giấc Mơ Cá Vàng',
    description: 'Hóa thân thành cô bé/cậu bé cưỡi cá chép khổng lồ, du ngoạn trong một thế giới thần tiên đầy màu sắc và mộng mơ.',
    imageUrl: CUSTOM_OVERRIDES['goldfish_dream']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/goldfish-dream.jpg',
    constants: GoldfishDreamConstants,
    clothingSuggestionPrompt: 'váy trắng thướt tha cho trẻ em',
    buildPrompt: buildGoldfishDreamPrompt,
  },
  {
    id: 'luminous_flowers',
    name: 'Vườn Hoa Phát Sáng',
    description: 'Hóa thân thành nàng tiên giữa khu vườn đêm huyền ảo, được bao quanh bởi những đóa hoa phát sáng lung linh.',
    imageUrl: CUSTOM_OVERRIDES['luminous_flowers']?.imageUrl || 'https://storage.googleapis.com/aistudio-bucket/tool-covers/luminous-flowers.jpg',
    constants: LuminousFlowersConstants,
    clothingSuggestionPrompt: 'váy voan trắng mỏng, trong suốt',
    buildPrompt: buildLuminousFlowersPrompt,
  },
];


const ADMIN_KEY = 'aiStudioAdmin';
const OVERRIDES_KEY = 'aiStudioToolOverrides';
const IMAGE_LIBRARY_KEY = 'aiStudioImageLibrary';

interface HubViewProps {
  onSelectTool: (tool: Tool) => void;
  onNavigateToDonation: () => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function HubView({ onSelectTool, onNavigateToDonation, isAdmin, setIsAdmin }: HubViewProps): React.ReactElement {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);
  const [isPublishModalOpen, setPublishModalOpen] = useState(false);
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [currentToolId, setCurrentToolId] = useState<string | null>(null);
  const [currentCode, setCurrentCode] = useState('');

  // Combine initial tools with overrides from localStorage
  useEffect(() => {
    try {
      const savedOverrides = localStorage.getItem(OVERRIDES_KEY);
      const overrides = savedOverrides ? JSON.parse(savedOverrides) : {};
      
      const mergedTools = INITIAL_TOOLS.map(tool => ({
        ...tool,
        name: overrides[tool.id]?.name || CUSTOM_OVERRIDES[tool.id]?.name || tool.name,
        imageUrl: overrides[tool.id]?.imageUrl || CUSTOM_OVERRIDES[tool.id]?.imageUrl || tool.imageUrl,
      }));
      setTools(mergedTools);
    } catch (e) {
        console.error("Could not parse data from localStorage", e);
        setTools(INITIAL_TOOLS); // Fallback to initial tools
        localStorage.removeItem(OVERRIDES_KEY);
    }
  }, []);

  const getOverrides = (): any => {
    const savedOverrides = localStorage.getItem(OVERRIDES_KEY);
    return savedOverrides ? JSON.parse(savedOverrides) : {};
  }
  
  const saveOverrides = (overrides: any) => {
      try {
        localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
      } catch (e) {
          console.error("Could not save overrides to localStorage", e);
      }
  };

  const [imageLibrary, setImageLibrary] = useState<ImageItem[]>(() => {
    try {
        const saved = localStorage.getItem(IMAGE_LIBRARY_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });

  useEffect(() => {
      try {
          localStorage.setItem(IMAGE_LIBRARY_KEY, JSON.stringify(imageLibrary));
      } catch (e) {
          console.error("Could not save image library to localStorage", e);
      }
  }, [imageLibrary]);

  const handleAddToLibrary = (imagesBase64: string[]) => {
      const newItems: ImageItem[] = imagesBase64.map(src => ({ id: Date.now().toString() + Math.random(), src }));
      setImageLibrary(prev => [...newItems, ...prev]);
  };
  
  const handleDeleteFromLibrary = (id: string) => {
    setImageLibrary(prev => prev.filter(item => item.id !== id));
  };

  const handleAdminLogin = () => {
    localStorage.setItem(ADMIN_KEY, 'true');
    setIsAdmin(true);
    setLoginModalOpen(false);
  };
  
  const handleAdminLogout = () => {
    if (window.confirm('Bạn có muốn đăng xuất khỏi chế độ quản trị?')) {
        localStorage.removeItem(ADMIN_KEY);
        setIsAdmin(false);
    }
  };
  
  const handleOpenImageLibrary = (toolId: string) => {
      setCurrentToolId(toolId);
      setLibraryModalOpen(true);
  };
  
  const handleSelectImageForTool = (imageBase64: string) => {
      if (!currentToolId) return;

      cropImageToSquare(imageBase64).then(croppedImage => {
          setTools(prevTools =>
              prevTools.map(tool =>
                  tool.id === currentToolId ? { ...tool, imageUrl: croppedImage } : tool
              )
          );
          
          const overrides = getOverrides();
          if (!overrides[currentToolId]) {
              overrides[currentToolId] = {};
          }
          overrides[currentToolId].imageUrl = croppedImage;
          saveOverrides(overrides);

      }).catch(err => {
          console.error("Lỗi khi cắt ảnh:", err);
          alert("Không thể xử lý ảnh đã chọn.");
      }).finally(() => {
          setLibraryModalOpen(false);
          setCurrentToolId(null);
      });
  };

  const handleToolNameChange = (toolId: string, newName: string) => {
      setTools(prevTools => 
          prevTools.map(tool => tool.id === toolId ? {...tool, name: newName} : tool)
      );

      const overrides = getOverrides();
      if (!overrides[toolId]) {
          overrides[toolId] = {};
      }
      overrides[toolId].name = newName;
      saveOverrides(overrides);
  };
  
  const handleResetAllChanges = () => {
      if (window.confirm('Bạn có chắc muốn hoàn tác tất cả các thay đổi về tên và ảnh đại diện đã lưu trên máy này không?')) {
          localStorage.removeItem(OVERRIDES_KEY);
          // Reload tools from initial configuration + permanent overrides
          const mergedTools = INITIAL_TOOLS.map(tool => ({
            ...tool,
            name: CUSTOM_OVERRIDES[tool.id]?.name || tool.name,
            imageUrl: CUSTOM_OVERRIDES[tool.id]?.imageUrl || tool.imageUrl,
          }));
          setTools(mergedTools);
      }
  };

  const handleGetImageCode = (imageBase64: string) => {
      setCurrentCode(imageBase64);
      setLibraryModalOpen(false); // Close library
      setCodeModalOpen(true); // Open code modal
  };

  const handleCloseCodeModal = () => {
      setCodeModalOpen(false);
      setLibraryModalOpen(true); // Re-open library
  };
  
  const getAllOverridesForPublish = () => {
    const localOverrides = getOverrides();
    // A more robust merge: local overrides take precedence over file overrides for publishing
    const allOverrides = { ...CUSTOM_OVERRIDES };
    for (const toolId in localOverrides) {
        if (!allOverrides[toolId]) {
            allOverrides[toolId] = {};
        }
        if (localOverrides[toolId].name) {
            allOverrides[toolId].name = localOverrides[toolId].name;
        }
        if (localOverrides[toolId].imageUrl) {
            allOverrides[toolId].imageUrl = localOverrides[toolId].imageUrl;
        }
    }
    return allOverrides;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <Header title="Trac Quoc Studio" description="Chọn một công cụ để bắt đầu hành trình sáng tạo của bạn." />
        <button 
            onClick={onNavigateToDonation}
            className="flex-shrink-0 ml-4 mt-2 text-sm font-medium bg-neutral-800 text-amber-300 py-2 px-4 rounded-full hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-amber-500"
        >
          <span>Mời tôi ly cà phê</span>
        </button>
      </div>

      {isAdmin && (
        <div className="my-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg flex flex-wrap items-center justify-between gap-4">
            <p className="text-amber-300 font-semibold text-sm">
                ✨ Bạn đang ở chế độ Quản trị viên.
            </p>
            <div className="flex flex-wrap items-center gap-3">
                 <button onClick={() => setPublishModalOpen(true)} className="text-sm font-medium bg-green-500/80 text-white py-1.5 px-4 rounded-full hover:bg-green-500 transition-colors">
                    Công Bố Thay Đổi...
                </button>
                <button onClick={handleResetAllChanges} className="text-sm font-medium bg-neutral-700 text-slate-300 py-1.5 px-4 rounded-full hover:bg-neutral-600 transition-colors">
                    Hoàn Tác Thay Đổi Cục Bộ
                </button>
                <button onClick={handleAdminLogout} className="text-sm font-medium bg-red-800/80 text-white py-1.5 px-4 rounded-full hover:bg-red-700 transition-colors">
                    Đăng Xuất
                </button>
            </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            tool={tool}
            isAdmin={isAdmin}
            onSelect={() => onSelectTool(tool)} 
            onChangeImage={() => handleOpenImageLibrary(tool.id)}
            onToolNameChange={handleToolNameChange}
          />
        ))}
      </div>
      
       {!isAdmin && (
           <div className="text-center mt-12">
                <button onClick={() => setLoginModalOpen(true)} className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
                    Đăng nhập quản trị
                </button>
           </div>
       )}

      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLogin={handleAdminLogin}
      />
      
      <ImageLibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => setLibraryModalOpen(false)}
        imageLibrary={imageLibrary}
        onSelectImage={handleSelectImageForTool}
        onAddToLibrary={handleAddToLibrary}
        onDeleteFromLibrary={handleDeleteFromLibrary}
        onGetCode={handleGetImageCode}
      />

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        initialTools={INITIAL_TOOLS} // Pass the original tools to preserve order
        allOverrides={getAllOverridesForPublish()}
      />

      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={handleCloseCodeModal}
        code={currentCode}
        title="Lấy mã ảnh Base64"
        instructions={
            <ol className="text-sm list-decimal list-inside bg-neutral-900/50 p-3 rounded-lg mt-3 space-y-1 border border-neutral-700">
                <li>Nhấn nút <strong>"Sao Chép Mã"</strong> bên dưới.</li>
                <li>Mở tệp mã nguồn <code className="font-mono bg-neutral-700 text-amber-300 px-1 py-0.5 rounded text-xs">custom-tool-overrides.ts</code> trong thư mục gốc của dự án.</li>
                <li>Tìm đến ID của công cụ bạn muốn thay đổi (ví dụ: 'studio').</li>
                <li>Trong đối tượng tương ứng với ID đó, hãy dán mã đã sao chép vào thuộc tính <code className="font-mono bg-neutral-700 text-amber-300 px-1 py-0.5 rounded text-xs">imageUrl</code>.</li>
            </ol>
        }
      />

    </div>
  );
}