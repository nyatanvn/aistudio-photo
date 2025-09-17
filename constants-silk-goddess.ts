import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'elegant_portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào vẻ đẹp thanh tú, trang sức và kiểu tóc cầu kỳ',
  },
  {
    id: 'dynamic_half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện sự mềm mại của trang phục lụa và dáng tay uyển chuyển',
  },
  {
    id: 'full_body_flow',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, bắt trọn khoảnh khắc bộ trang phục lụa đang bay bổng trong không gian nghệ thuật',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'soft_studio_light',
    name: 'Ánh Sáng Mềm Mại',
    prompt: 'ánh sáng studio mềm mại, khuếch tán, tôn lên chất liệu lụa và làn da mịn màng, tạo cảm giác thanh tao, cao cấp.',
  },
  {
    id: 'golden_hour_glow',
    name: 'Tông Vàng Ấm Áp',
    prompt: 'ánh sáng tông vàng ấm như hoàng hôn, tạo ra các vệt sáng vàng óng trên trang phục, mang lại cảm giác quyền lực và sang trọng.',
  },
  {
    id: 'dramatic_contrast',
    name: 'Tương Phản Kịch Tính',
    prompt: 'sử dụng ánh sáng mạnh và bóng đổ sâu để tạo kịch tính, làm nổi bật các nếp gấp của lụa và đường nét cơ thể.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'gradient_backdrop', name: 'Phông Nền Chuyển Sắc', prompt: 'phông nền studio tối giản với màu sắc chuyển từ nâu vàng sang xám đậm, tạo chiều sâu nghệ thuật.' },
    { id: 'abstract_silk_forms', name: 'Lụa Trừu Tượng', prompt: 'phông nền là các dải lụa lớn được sắp đặt thành các hình khối trừu tượng, mờ ảo phía sau chủ thể.' },
    { id: 'smoky_atmosphere', name: 'Không Gian Khói Mờ', prompt: 'không gian có một lớp khói hoặc sương mỏng, tạo cảm giác huyền ảo, mộng mị.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'serene_gaze', name: 'Thanh Tao', prompt: 'ánh mắt nhìn thẳng, biểu cảm thanh thản và có chiều sâu, toát lên vẻ đẹp nội tâm.' },
    { id: 'confident_smirk', name: 'Kiêu Hãnh', prompt: 'một nụ cười nửa miệng đầy tự tin, ánh mắt sắc sảo, thể hiện sự quyền lực.' },
    { id: 'pensive_elegance', name: 'Trầm Tư', prompt: 'ánh mắt nhìn xa xăm, biểu cảm có chút suy tư, thanh lịch và quý phái.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Dáng Vẻ Thướt Tha',
    poses: [
      {
        id: 'flowing_dress',
        name: 'Tà Váy Bay Bổng',
        prompt: 'chủ thể trong tư thế xoay nhẹ, khiến các dải lụa của trang phục bay lên một cách mềm mại và đầy nghệ thuật',
      },
      {
        id: 'elegant_stance',
        name: 'Thế Đứng Thanh Lịch',
        prompt: 'chủ thể đứng theo dáng contrapposto, một tay đặt nhẹ lên hông, tay còn lại thả lỏng, khoe trọn vẻ đẹp của trang phục',
      },
      {
        id: 'reaching_hand',
        name: 'Bàn Tay Vươn Tới',
        prompt: 'một tay của chủ thể vươn ra một cách duyên dáng, như đang chạm vào một thứ gì đó vô hình, ánh mắt nhìn theo hướng tay',
      },
    ]
  },
  {
    name: 'Nét Đẹp Quyền Lực',
    poses: [
       {
        id: 'gaze_over_shoulder',
        name: 'Cái Nhìn Ngoảnh Lại',
        prompt: 'chủ thể quay lưng nhẹ và ngoảnh đầu lại nhìn qua vai, ánh mắt sắc sảo và đầy quyền lực',
      },
      {
        id: 'hands_on_waist',
        name: 'Tay Chống Hông',
        prompt: 'hai tay chống hông, dáng đứng vững chãi, cằm hơi nâng, thể hiện sự tự tin và thống lĩnh',
      },
       {
        id: 'seated_gracefully',
        name: 'Dáng Ngồi Quý Phái',
        prompt: 'chủ thể ngồi trên một chiếc ghế đơn giản, lưng thẳng, một tay đặt lên đùi, toát lên vẻ quý phái và điềm tĩnh',
      },
    ]
  },
];
