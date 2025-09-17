import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'close_up_joy',
    name: 'Cận cảnh',
    prompt: 'chụp cận cảnh gương mặt vui tươi của đứa trẻ, có thể thấy một phần của con cá vàng ở hậu cảnh',
  },
  {
    id: 'wide_shot_surreal',
    name: 'Toàn cảnh',
    prompt: 'chụp góc rộng để thấy toàn bộ con cá vàng khổng lồ và đứa trẻ đang cưỡi trên lưng, thể hiện sự tương phản kích thước',
  },
  {
    id: 'dynamic_action',
    name: 'Hành động',
    prompt: 'chụp khoảnh khắc con cá đang quẫy đuôi hoặc bay lên, nước bắn tung tóe, tạo cảm giác chuyển động và sống động',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'vibrant_and_clear',
    name: 'Trong Trẻo & Rực Rỡ',
    prompt: 'phong cách siêu thực, màu sắc rực rỡ, độ tương phản cao, ánh sáng trong trẻo như ban ngày, làm nổi bật màu đỏ của cá và màu trắng của trang phục.',
  },
  {
    id: 'dreamy_soft_focus',
    name: 'Mềm Mại Mơ Màng',
    prompt: 'sử dụng hiệu ứng soft-focus (làm mềm nét), ánh sáng khuếch tán, tạo cảm giác như một giấc mơ, huyền ảo và nhẹ nhàng.',
  },
  {
    id: 'watercolor_effect',
    name: 'Hiệu Ứng Màu Nước',
    prompt: 'phong cách nghệ thuật, hình ảnh có các vệt màu và kết cấu như một bức tranh màu nước, nhưng vẫn giữ được sự chân thực của chủ thể.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'clear_white', name: 'Nền Trắng Tinh Khiết', prompt: 'phông nền trắng hoặc xanh da trời rất nhạt, tối giản, làm nổi bật hoàn toàn chủ thể và con cá.' },
    { id: 'splashing_water', name: 'Nước Bắn Tung Tóe', prompt: 'xung quanh có những tia nước và bong bóng được tạo hình một cách nghệ thuật, thể hiện sự chuyển động.' },
    { id: 'sea_of_clouds', name: 'Biển Mây Bồng Bềnh', prompt: 'bối cảnh là một biển mây trắng bồng bềnh, con cá như đang bay lượn trên bầu trời.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'joyful_laugh', name: 'Cười Tươi Rạng Rỡ', prompt: 'biểu cảm vui sướng, miệng cười tươi để lộ răng, ánh mắt lấp lánh niềm vui.' },
    { id: 'amazed_look', name: 'Ngạc Nhiên Thích Thú', prompt: 'ánh mắt mở to, biểu cảm ngạc nhiên và đầy kinh ngạc như vừa khám phá ra một thế giới mới.' },
    { id: 'playful_shout', name: 'Hét Lên Tinh Nghịch', prompt: 'miệng mở như đang hét lên một cách vui vẻ, thể hiện sự tinh nghịch và năng động.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tư Thế Cưỡi Cá',
    poses: [
      {
        id: 'riding_confidently',
        name: 'Cưỡi Vững Vàng',
        prompt: 'đứa trẻ ngồi vững vàng trên lưng cá, hai tay nắm nhẹ vây lưng, mắt nhìn thẳng về phía trước đầy tự tin',
      },
      {
        id: 'leaning_forward',
        name: 'Rướn Người Về Trước',
        prompt: 'đứa trẻ rướn người về phía trước, tóc bay ngược ra sau, như đang thúc giục con cá bơi nhanh hơn',
      },
      {
        id: 'looking_back',
        name: 'Ngoảnh Lại Mỉm Cười',
        prompt: 'đứa trẻ ngồi trên lưng cá nhưng ngoảnh đầu lại nhìn máy ảnh và mỉm cười một cách tinh nghịch',
      },
    ]
  },
  {
    name: 'Vui Đùa Cùng Nước',
    poses: [
       {
        id: 'reaching_for_water',
        name: 'Vươn Tay Vọc Nước',
        prompt: 'đứa trẻ nghiêng người, một tay vươn xuống chạm vào mặt nước hoặc các tia nước đang bắn lên',
      },
      {
        id: 'arms_outstretched',
        name: 'Dang Rộng Vòng Tay',
        prompt: 'đứa trẻ đứng hoặc ngồi trên lưng cá, hai tay dang rộng, như đang tận hưởng sự tự do và bay bổng',
      },
       {
        id: 'splashing_with_feet',
        name: 'Đạp Nước Vui Đùa',
        prompt: 'đứa trẻ ngồi bên mép, hai chân đung đưa và đạp vào nước, tạo ra những tia nước nhỏ',
      },
    ]
  },
];
