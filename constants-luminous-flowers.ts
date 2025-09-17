import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'ethereal_portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh gương mặt thanh tú, tập trung vào biểu cảm mơ màng và các chi tiết hoa phát sáng trên tóc hoặc da',
  },
  {
    id: 'mid_body_in_flowers',
    name: 'Nửa người',
    prompt: 'chụp nửa người, chủ thể được bao quanh bởi những bông hoa phát sáng khổng lồ',
  },
  {
    id: 'full_body_fantasy',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, thể hiện trọn vẹn vóc dáng thanh tao trong bộ váy voan giữa khu vườn đêm huyền ảo',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'luminous_glow',
    name: 'Vầng Sáng Huyền Ảo',
    prompt: 'phong cách nghệ thuật kỳ ảo, ánh sáng mềm mại phát ra từ những bông hoa, tạo ra một vầng sáng (ethereal glow) xung quanh chủ thể, tông màu lạnh với sắc trắng, hồng và tím nhạt.',
  },
  {
    id: 'dreamy_bokeh',
    name: 'Bokeh Mơ Mộng',
    prompt: 'ánh sáng lung linh với hiệu ứng bokeh từ các đốm sáng nhỏ li ti trong không khí và hậu cảnh, tạo cảm giác như lạc vào một thế giới thần tiên.',
  },
  {
    id: 'enchanted_night',
    name: 'Đêm Mê Hoặc',
    prompt: 'tông màu tối và sâu hơn, độ tương phản cao, ánh sáng từ hoa nổi bật trên nền đêm, tạo cảm giác bí ẩn và quyến rũ.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'glowing_rose_garden', name: 'Vườn Hồng Phát Sáng', prompt: 'bối cảnh là một khu vườn với những bông hoa hồng hoặc mẫu đơn khổng lồ, tự phát ra ánh sáng dịu nhẹ.' },
    { id: 'enchanted_forest', name: 'Rừng Mê Hoặc', prompt: 'phông nền là một khu rừng đêm với những cây cổ thụ và các loài hoa dại phát sáng dưới chân.' },
    { id: 'fireflies_and_stars', name: 'Đom Đóm & Tinh Tú', prompt: 'không gian mở, có vô số đom đóm bay lượn và bầu trời đầy sao lấp lánh.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'serene', name: 'An Nhiên', prompt: 'biểu cảm thanh thản, đôi mắt nhắm hờ, môi hé nhẹ, toát lên vẻ bình yên.' },
    { id: 'wistful', name: 'Mơ Màng', prompt: 'ánh mắt nhìn xa xăm, biểu cảm có chút suy tư, lãng mạn như đang chìm trong giấc mơ.' },
    { id: 'gentle_smile', name: 'Mỉm Cười Dịu Dàng', prompt: 'một nụ cười mỉm nhẹ nhàng, hiền hòa, thể hiện sự kết nối với thiên nhiên xung quanh.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tương Tác Với Thiên Nhiên',
    poses: [
      {
        id: 'touching_glowing_flower',
        name: 'Chạm Vào Đóa Hoa',
        prompt: 'một tay của chủ thể chạm nhẹ vào một đóa hoa đang phát sáng, ánh mắt nhìn vào điểm tiếp xúc',
      },
      {
        id: 'holding_light_orb',
        name: 'Nâng Quả Cầu Sáng',
        prompt: 'chủ thể hai tay nâng niu một quả cầu ánh sáng nhỏ, như thể đó là một con đom đóm lớn hoặc một linh hồn của khu rừng',
      },
      {
        id: 'lying_on_glowing_moss',
        name: 'Nằm Trên Thảm Rêu',
        prompt: 'chủ thể nằm nghiêng trên một thảm rêu phát sáng, cơ thể thả lỏng, mắt nhắm hờ',
      },
    ]
  },
  {
    name: 'Dáng Vẻ Thần Tiên',
    poses: [
       {
        id: 'sitting_among_flowers',
        name: 'Tựa Mình Giữa Hoa',
        prompt: 'chủ thể ngồi giữa những bông hoa khổng lồ, một tay chống nhẹ, tay còn lại đặt lên đùi, dáng vẻ thanh thoát',
      },
      {
        id: 'looking_up_at_light',
        name: 'Ngước Nhìn Ánh Sáng',
        prompt: 'chủ thể đứng, ngẩng đầu nhìn lên một nguồn sáng lung linh phía trên (như mặt trăng hoặc một bông hoa lớn)',
      },
       {
        id: 'graceful_dance',
        name: 'Điệu Múa Dưới Đêm',
        prompt: 'tư thế như đang thực hiện một điệu múa uyển chuyển, tay và váy áo bay nhẹ, hòa mình vào không gian huyền ảo',
      },
    ]
  },
];