import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào biểu cảm thanh thoát và thần thái của vũ công',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện sự uyển chuyển của phần thân trên và đôi tay',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, phô diễn trọn vẹn tư thế ballet và vẻ đẹp hình thể',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'ethereal_ballerina',
    name: 'Vũ Công Tối Giản',
    prompt: 'phong cách tạp chí thời trang, ánh sáng studio làm nổi bật cơ thể và trang phục, độ nét cao, phông nền tối giản.',
  },
  {
    id: 'starry_night_fantasy',
    name: 'Bầu Trời Sao Ảo Mộng',
    prompt: 'phông nền tối đen với vô số hạt sáng lấp lánh như bầu trời sao, tạo cảm giác kỳ ảo, cổ tích.',
  },
  {
    id: 'angelic_wings',
    name: 'Đôi Cánh Thiên Thần',
    prompt: 'thêm một đôi cánh thiên thần lớn, phát sáng mềm mại sau lưng chủ thể, tăng thêm phần siêu thực và bay bổng.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'dark_studio', name: 'Studio Tối', prompt: 'phông nền studio màu xám đậm hoặc đen, tập trung hoàn toàn vào chủ thể.' },
    { id: 'spotlight', name: 'Ánh Đèn Sân Khấu', prompt: 'một luồng ánh sáng sân khấu (spotlight) chiếu từ trên xuống, tạo một vòng sáng trên sàn xung quanh chủ thể.' },
    { id: 'glitter_fall', name: 'Mưa Kim Tuyến', prompt: 'có những hạt kim tuyến màu bạc hoặc vàng lấp lánh rơi xung quanh chủ thể.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'graceful_serenity', name: 'Thanh Thoát, Bình Yên', prompt: 'biểu cảm thanh thoát, bình yên, mắt có thể nhắm hờ, toát lên vẻ đẹp nội tâm.' },
    { id: 'focused_passion', name: 'Tập Trung & Đam Mê', prompt: 'vẻ mặt tập trung, thể hiện niềm đam mê và cảm xúc của một vũ công đang biểu diễn.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tư Thế Ballet',
    poses: [
      {
        id: 'arabesque',
        name: 'Dáng Arabesque',
        prompt: 'thực hiện tư thế ballet arabesque kinh điển, đứng trên một chân và giơ chân còn lại ra sau, tay vươn dài',
      },
      {
        id: 'arms_en_haut',
        name: 'Tay Cao Qua Đầu',
        prompt: 'đứng thẳng, hai tay giơ cao qua đầu, tạo thành một vòng cung mềm mại (vị trí en haut trong ballet)',
      },
      {
        id: 'seated_ballerina',
        name: 'Ngồi Duyên Dáng',
        prompt: 'ngồi trên sàn, duỗi thẳng chân hoặc co một chân, lưng thẳng, tay tạo dáng uyển chuyển',
      },
    ]
  },
  {
    name: 'Nghệ Thuật & Đạo Cụ',
    poses: [
      {
        id: 'holding_snow_globe',
        name: 'Nâng Quả Cầu Tuyết',
        prompt: 'chủ thể hai tay nâng niu một quả cầu tuyết thủy tinh, ánh mắt nhìn vào bên trong đầy mơ mộng',
      },
      {
        id: 'back_pose',
        name: 'Khoe Lưng Trần',
        prompt: 'quay lưng về phía máy ảnh, hai tay giơ cao hoặc đặt sau lưng, khoe trọn vẻ đẹp của lưng và trang phục',
      },
       {
        id: 'elegant_stretch',
        name: 'Vươn Vai Thanh Lịch',
        prompt: 'tư thế vươn vai hoặc duỗi người một cách thanh lịch, thể hiện sự dẻo dai của cơ thể',
      },
    ]
  },
];
