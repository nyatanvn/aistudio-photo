import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào vẻ đẹp thanh khiết, thoát tục và biểu cảm an nhiên',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện trang phục lụa và sự tương tác nhẹ nhàng với hoa sen hoặc mặt nước',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, khoe trọn vóc dáng thanh tao giữa khung cảnh hồ sen và ánh trăng huyền ảo',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'moonlight_glow',
    name: 'Ánh Trăng Huyền Ảo',
    prompt: 'ánh trăng bạc mềm mại chiếu rọi, tạo ra một vầng sáng huyền ảo (ethereal glow) xung quanh chủ thể, tông màu lạnh với sắc xanh và bạc.',
  },
  {
    id: 'misty_water',
    name: 'Làn Sương Mờ Ảo',
    prompt: 'không gian có một lớp sương mỏng lãng đãng trên mặt hồ, ánh sáng khuếch tán, tạo cảm giác thơ mộng, thoát tục.',
  },
  {
    id: 'bioluminescent_lotus',
    name: 'Sen Xanh Phát Sáng',
    prompt: 'những bông hoa sen xanh xung quanh phát ra ánh sáng sinh học nhẹ nhàng, chiếu sáng chủ thể một cách kỳ ảo, ma mị.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'moonlit_pond', name: 'Bên Hồ Sen Đêm', prompt: 'bối cảnh là một hồ sen tĩnh lặng dưới ánh trăng, mặt nước phản chiếu bầu trời đêm và những vì sao.' },
    { id: 'lotus_field', name: 'Giữa Vườn Sen', prompt: 'chủ thể đứng hoặc ngồi giữa một vườn sen xanh đang nở rộ, lá sen và hoa bao quanh.' },
    { id: 'ancient_pavilion', name: 'Thủy Tạ Cổ Kính', prompt: 'phông nền là một thủy tạ (pavilion) cổ kính bên hồ, kiến trúc gỗ đơn sơ, hòa mình với thiên nhiên.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'serene', name: 'An Nhiên', prompt: 'biểu cảm thanh thản, bình yên, đôi mắt có thể nhắm hờ hoặc nhìn xuống mặt nước.' },
    { id: 'gentle_smile', name: 'Mỉm Cười Thanh Thoát', prompt: 'một nụ cười mỉm nhẹ nhàng, hiền từ, toát lên vẻ đẹp nội tâm.' },
    { id: 'transcendent', name: 'Thoát Tục', prompt: 'ánh mắt nhìn xa xăm, biểu cảm có chiều sâu, như đang hòa mình vào vũ trụ.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tương Tác Với Hoa Sen',
    poses: [
      {
        id: 'holding_lotus',
        name: 'Nâng Đóa Sen Xanh',
        prompt: 'một tay nâng nhẹ một đóa sen xanh đang hé nở, tay còn lại thả lỏng, ánh mắt nhìn vào bông hoa',
      },
      {
        id: 'touching_water',
        name: 'Tay Chạm Mặt Nước',
        prompt: 'chủ thể ngồi bên mép hồ, ngón tay chạm nhẹ vào mặt nước, tạo ra những gợn sóng lan tỏa',
      },
      {
        id: 'scenting_lotus',
        name: 'Thưởng Hương Sen',
        prompt: 'chủ thể đưa một bông sen lại gần, mắt nhắm hờ như đang cảm nhận hương thơm thanh khiết',
      },
    ]
  },
  {
    name: 'Dáng Vẻ Thần Tiên',
    poses: [
       {
        id: 'meditative_pose',
        name: 'Ngồi Thiền Trên Lá Sen',
        prompt: 'chủ thể ngồi trong tư thế thiền định trên một chiếc lá sen khổng lồ, hai tay đặt trên đầu gối',
      },
      {
        id: 'moon_gazing',
        name: 'Ngắm Trăng',
        prompt: 'chủ thể đứng, ngẩng đầu nhìn lên ánh trăng, tà áo bay nhẹ trong gió đêm',
      },
       {
        id: 'dancing_on_water',
        name: 'Múa Trên Mặt Nước',
        prompt: 'tư thế như đang thực hiện một điệu múa uyển chuyển trên mặt hồ, chân trần chạm nhẹ mặt nước',
      },
    ]
  },
];
