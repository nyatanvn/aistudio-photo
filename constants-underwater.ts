import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'close_up',
    name: 'Cận mặt',
    prompt: 'chụp cận cảnh gương mặt, tập trung vào biểu cảm thanh thoát và các chi tiết như cánh hoa trên da',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện chuyển động mềm mại của cơ thể và trang phục trong nước',
  },
  {
    id: 'three_quarters',
    name: '3/4 cơ thể',
    prompt: 'chụp góc rộng hơn, lấy được phần lớn cơ thể đang trôi nổi nhẹ nhàng trong làn nước',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'dreamy_blue',
    name: 'Xanh Biếc Mộng Mơ',
    prompt: 'tông màu xanh dương và xanh ngọc làm chủ đạo, ánh sáng mềm mại, khuếch tán như ánh trăng dưới nước, tạo cảm giác thanh bình, mơ màng',
  },
  {
    id: 'mystical_purple',
    name: 'Tím Huyền Ảo',
    prompt: 'pha trộn tông màu tím và hồng pastel vào làn nước, ánh sáng có các vệt lấp lánh (glittering light), tạo không khí huyền ảo, cổ tích',
  },
  {
    id: 'piercing_light',
    name: 'Ánh Sáng Xuyên Thấu',
    prompt: 'có những luồng sáng mạnh (god rays) từ mặt nước chiếu xuống, tạo độ tương phản cao, làm nổi bật chủ thể một cách đầy nghệ thuật và ấn tượng',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'clear_water', name: 'Làn Nước Tĩnh', prompt: 'bối cảnh là làn nước trong xanh, tĩnh lặng, tập trung hoàn toàn vào vẻ đẹp của chủ thể.' },
    { id: 'floating_petals', name: 'Cánh Hoa Trôi', prompt: 'xung quanh chủ thể có những cánh hoa hồng, hoa anh đào màu hồng và trắng đang trôi nổi lững lờ.' },
    { id: 'air_bubbles', name: 'Bong Bóng Khí', prompt: 'xung quanh có những bong bóng khí nhỏ li ti, tạo thêm sự sống động và cảm giác chân thực dưới nước.' },
    { id: 'water_surface', name: 'Phản Chiếu Bề Mặt', prompt: 'bối cảnh bao gồm cả bề mặt nước gợn sóng phía trên, tạo hiệu ứng ánh sáng khúc xạ và phản chiếu lung linh.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'serene', name: 'Thanh Thản', prompt: 'biểu cảm thanh thản, đôi mắt nhắm hờ hoặc nhìn xa xăm, toát lên vẻ bình yên.' },
    { id: 'pensive', name: 'Trầm Tư', prompt: 'vẻ mặt trầm tư, có chút u buồn nhẹ, ánh mắt sâu thẳm, đầy nội tâm.' },
    { id: 'dreamy', name: 'Mơ Màng', prompt: 'biểu cảm mơ màng, đôi môi hé nhẹ, như đang lạc trong một giấc mơ đẹp.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Nét Tĩnh Lặng',
    poses: [
      {
        id: 'serene_gaze',
        name: 'Ánh Nhìn Tĩnh Lặng',
        prompt: 'chủ thể nhìn thẳng vào ống kính với ánh mắt trong veo, tĩnh lặng, hai tay thả lỏng tự nhiên',
      },
      {
        id: 'hands_on_chest',
        name: 'Tay Ôm Bờ Vai',
        prompt: 'chủ thể đặt một hoặc hai tay lên ngực hoặc vai, đầu hơi nghiêng, mắt nhắm hờ, thể hiện sự tự tại',
      },
      {
        id: 'face_half_submerged',
        name: 'Gương Mặt Nửa Chìm',
        prompt: 'chủ thể ở ngay dưới mặt nước, một phần gương mặt phản chiếu trên mặt nước, tạo hiệu ứng đối xứng độc đáo',
      },
    ]
  },
  {
    name: 'Dáng Vẻ Mơ Màng',
    poses: [
      {
        id: 'reaching_for_light',
        name: 'Vươn Tới Ánh Sáng',
        prompt: 'chủ thể ngước nhìn lên mặt nước, một tay vươn về phía ánh sáng, cơ thể uốn lượn mềm mại',
      },
      {
        id: 'hands_framing_face',
        name: 'Tay Nâng Gương Mặt',
        prompt: 'chủ thể dùng hai tay nhẹ nhàng nâng hoặc обрамляя gương mặt, ánh mắt nhìn xa xăm',
      },
       {
        id: 'sinking_gracefully',
        name: 'Chìm Trong Mộng Mị',
        prompt: 'chủ thể trong tư thế như đang từ từ chìm xuống, cơ thể thả lỏng, tóc và váy áo trôi nổi xung quanh',
      },
    ]
  },
];
