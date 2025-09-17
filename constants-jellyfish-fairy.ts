import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh gương mặt, tập trung vào biểu cảm huyền bí và các chi tiết phát sáng',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện sự uyển chuyển của cơ thể và các dải lụa, xúc tu bay bổng',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, bắt trọn khoảnh khắc chủ thể đang trôi nổi hoặc khiêu vũ trong không gian kỳ ảo',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'bioluminescent_glow',
    name: 'Ánh Sáng Sứa Biển',
    prompt: 'phong cách nghệ thuật kỳ ảo, ánh sáng phát quang sinh học (bioluminescent) màu xanh dương, tím và hồng, tỏa ra từ chủ thể và các chi tiết xung quanh, tạo cảm giác như ở dưới đáy biển sâu.',
  },
  {
    id: 'mystical_flow',
    name: 'Dòng Chảy Huyền Ảo',
    prompt: 'ánh sáng mềm mại, khuếch tán, với các vệt sáng (light trails) và hạt bụi phát sáng (glowing particles) bay lượn xung quanh, tạo không khí mộng mơ.',
  },
  {
    id: 'underwater_crystal',
    name: 'Pha Lê Dưới Nước',
    prompt: 'ánh sáng trong trẻo, sắc nét, có các hiệu ứng khúc xạ như pha lê, với các luồng sáng mạnh (god rays) chiếu xuyên qua làn nước mờ ảo.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'jellyfish_dance', name: 'Vũ Điệu Sứa Biển', prompt: 'xung quanh chủ thể là những hình hài sứa biển trừu tượng, phát sáng và đang chuyển động nhẹ nhàng.' },
    { id: 'light_orb', name: 'Quả Cầu Ánh Sáng', prompt: 'chủ thể tương tác với một hoặc nhiều quả cầu ánh sáng đang trôi nổi xung quanh.' },
    { id: 'ethereal_silk_curtains', name: 'Rèm Lụa Mờ Ảo', prompt: 'bối cảnh là những dải lụa hoặc vải trong suốt, phát sáng, tạo thành những lớp lang mờ ảo.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'mysterious', name: 'Bí Ẩn', prompt: 'một ánh nhìn bình thản, sâu thẳm và đầy bí ẩn, như một sinh vật cổ xưa.' },
    { id: 'serene', name: 'Thanh Tao', prompt: 'biểu cảm thanh thản, đôi mắt nhắm hờ, toát lên vẻ bình yên tuyệt đối.' },
    { id: 'enchanting', name: 'Mê Hoặc', prompt: 'ánh mắt nhìn thẳng, có sức mê hoặc, như đang thu hút người xem vào thế giới của mình.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tư Thế Bay Bổng',
    poses: [
      {
        id: 'floating_gracefully',
        name: 'Nổi Bồng Bềnh',
        prompt: 'chủ thể trong tư thế thả lỏng hoàn toàn, như đang không trọng lực, tay và chân duỗi mềm mại',
      },
      {
        id: 'underwater_dance',
        name: 'Khiêu Vũ Dưới Nước',
        prompt: 'một tư thế khiêu vũ năng động, cơ thể uốn lượn, các dải váy áo bay theo chuyển động',
      },
      {
        id: 'reaching_out',
        name: 'Vươn Tay Chạm',
        prompt: 'một tay của chủ thể vươn ra, như đang muốn chạm vào một điểm sáng hoặc người xem',
      },
    ]
  },
  {
    name: 'Tư Thế Tĩnh Lặng',
    poses: [
       {
        id: 'curled_peacefully',
        name: 'Cuộn Tròn Tĩnh Lặng',
        prompt: 'chủ thể trong tư thế cuộn tròn, ôm lấy đầu gối, thể hiện sự yên bình và tự tại',
      },
      {
        id: 'face_close_up',
        name: 'Đối Diện Mê Hoặc',
        prompt: 'chụp cận cảnh gương mặt, một tay đưa lên gần má, ánh mắt nhìn thẳng đầy cuốn hút',
      },
       {
        id: 'surrounded_by_light',
        name: 'Vây Quanh Bởi Ánh Sáng',
        prompt: 'chủ thể ngồi hoặc đứng yên, được bao bọc bởi các dải lụa và ánh sáng, tạo cảm giác được bảo vệ',
      },
    ]
  },
];
