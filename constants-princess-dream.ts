import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh gương mặt, tập trung vào biểu cảm ngọt ngào và trong sáng',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện trang phục và sự tương tác với bóng bay hoặc hoa',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, bắt trọn khoảnh khắc vui tươi trong không gian tiệc mộng mơ',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'soft_pink_pastel',
    name: 'Hồng Pastel Ngọt Ngào',
    prompt: 'tông màu hồng pastel làm chủ đạo, ánh sáng trong trẻo, dịu nhẹ, tạo cảm giác ngọt ngào, ngây thơ như kẹo bông.',
  },
  {
    id: 'bright_celebration',
    name: 'Rực Rỡ Tươi Vui',
    prompt: 'ánh sáng rực rỡ, tươi vui, màu sắc sống động với nhiều chi tiết lấp lánh từ bóng bay và kim tuyến.',
  },
  {
    id: 'ethereal_glow',
    name: 'Huyền Ảo Trong Mơ',
    prompt: 'chủ thể được bao quanh bởi một vầng sáng mềm mại, huyền ảo, làm mờ nhẹ hậu cảnh, tạo cảm giác như trong mơ.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'party_balloons', name: 'Bữa Tiệc Bóng Bay', prompt: 'bối cảnh tràn ngập bóng bay nhiều màu sắc, đặc biệt là bóng hình trái tim, bóng tráng gương màu vàng hồng.' },
    { id: 'ornate_wall', name: 'Tường Trang Trí', prompt: 'phông nền là một bức tường được trang trí cầu kỳ với các đường gờ, phào chỉ phong cách cổ điển màu trắng hoặc hồng.' },
    { id: 'flower_bouquet', name: 'Bên Lẵng Hoa', prompt: 'chủ thể ngồi cạnh một lẵng hoa lớn với nhiều loại hoa màu sắc tươi tắn.' },
    { id: 'confetti_disco', name: 'Kim Tuyến & Disco', prompt: 'không gian có kim tuyến bay và một quả cầu disco lấp lánh, tạo không khí lễ hội.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'sweet_smile', name: 'Cười Ngọt Ngào', prompt: 'một nụ cười ngọt ngào, trong sáng, ánh mắt vui tươi.' },
    { id: 'coy_look', name: 'E Lệ Đáng Yêu', prompt: 'ánh nhìn e lệ, có thể dùng tay che một phần mặt, biểu cảm đáng yêu.' },
    { id: 'surprised_joy', name: 'Ngạc Nhiên Vui Sướng', prompt: 'biểu cảm ngạc nhiên một cách vui vẻ, mắt mở to, miệng cười tươi.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Vui Đùa Cùng Đạo Cụ',
    poses: [
      {
        id: 'holding_balloons',
        name: 'Ôm Chùm Bóng Bay',
        prompt: 'chủ thể hai tay cầm hoặc ôm một chùm bóng bay lớn, người hơi ngả về sau, tươi cười',
      },
      {
        id: 'peeking_through_flowers',
        name: 'Nấp Sau Lẵng Hoa',
        prompt: 'chủ thể nấp sau một lẵng hoa lớn, chỉ để lộ một phần gương mặt với ánh nhìn tinh nghịch',
      },
      {
        id: 'playing_with_confetti',
        name: 'Thổi Kim Tuyến',
        prompt: 'chủ thể thổi một vốc kim tuyến lấp lánh về phía ống kính, tạo khoảnh khắc vui nhộn',
      },
    ]
  },
  {
    name: 'Tư Thế Ngọt Ngào',
    poses: [
      {
        id: 'hand_on_cheek',
        name: 'Tay Đặt Lên Má',
        prompt: 'một tay đặt nhẹ lên má, đầu hơi nghiêng, ánh mắt ngây thơ nhìn vào ống kính',
      },
      {
        id: 'sitting_on_floor',
        name: 'Ngồi Giữa Không Gian Tiệc',
        prompt: 'chủ thể ngồi trên sàn giữa bóng bay và hoa, hai tay chống nhẹ ra sau hoặc ôm đầu gối',
      },
       {
        id: 'arms_up_celebrating',
        name: 'Vươn Tay Vui Sướng',
        prompt: 'chủ thể vươn hai tay lên cao một cách tự do, như đang đón nhận một điều gì đó vui vẻ',
      },
    ]
  },
];
