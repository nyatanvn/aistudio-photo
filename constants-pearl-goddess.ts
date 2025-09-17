import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào vẻ đẹp ma mị, trang sức ngọc trai trên đầu và biểu cảm',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện trang phục, trang sức và sự tương tác với nội thất cổ điển',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, khoe trọn vẹn vóc dáng quyến rũ trong không gian sang trọng, tối tăm',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'dim_candlelight',
    name: 'Ánh Nến Mờ Ảo',
    prompt: 'phong cách chiaroscuro (tương phản sáng tối mạnh), ánh sáng chủ yếu đến từ những ngọn nến, tạo ra vùng sáng ấm áp và bóng tối sâu thẳm, có thể thêm hiệu ứng film grain nhẹ.',
  },
  {
    id: 'romantic_gothic',
    name: 'Gothic Lãng Mạn',
    prompt: 'ánh sáng mềm hơn nhưng vẫn trong không gian tối, tạo không khí lãng mạn nhưng có phần u buồn, ma mị, tập trung vào chi tiết của trang phục và bối cảnh.',
  },
  {
    id: 'powerful_glamour',
    name: 'Vẻ Đẹp Quyền Lực',
    prompt: 'ánh sáng mang tính thời trang (fashion editorial) hơn, vẫn giữ tông tối nhưng làm nổi bật chủ thể một cách sắc nét, toát lên vẻ quyền lực và sang trọng.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'vintage_room', name: 'Phòng Cổ Điển', prompt: 'bối cảnh là một căn phòng cổ điển, sang trọng nhưng u tối, với nội thất gỗ, giấy dán tường hoa văn và những cây nến đang cháy.' },
    { id: 'by_the_candelabra', name: 'Bên Giá Nến', prompt: 'chủ thể ở gần một giá nến (candelabra) lớn bằng đồng hoặc bạc, ánh nến chiếu lên khuôn mặt và trang sức.' },
    { id: 'dark_vanity', name: 'Trước Bàn Trang Điểm', prompt: 'chủ thể ngồi trước một chiếc bàn trang điểm cổ, nhìn vào gương hoặc nhìn thẳng vào ống kính.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'haughty', name: 'Kiêu Hãnh', prompt: 'một ánh nhìn tự tin, có phần kiêu hãnh, cằm hơi nâng nhẹ.' },
    { id: 'seductive', name: 'Mời Gọi', prompt: 'biểu cảm quyến rũ, ánh mắt nhìn thẳng đầy mời gọi, đôi môi hé mở.' },
    { id: 'pensive', name: 'Trầm Lắng', prompt: 'vẻ mặt trầm tư, ánh mắt nhìn xa xăm, thể hiện một tâm hồn sâu sắc và bí ẩn.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tư Thế Quyến Rũ',
    poses: [
      {
        id: 'goddess_profile',
        name: 'Góc Nghiêng Thần Thánh',
        prompt: 'chụp góc nghiêng của chủ thể, khoe trọn đường nét khuôn mặt và trang sức đầu lộng lẫy',
      },
      {
        id: 'seductive_lean_back',
        name: 'Tựa Lưng Gợi Cảm',
        prompt: 'chủ thể tựa lưng vào ghế hoặc tường, cơ thể hơi ngả sau, ánh mắt nhìn thẳng vào ống kính',
      },
      {
        id: 'languid_on_furniture',
        name: 'Nằm Hờ Hững',
        prompt: 'chủ thể nằm hoặc ngồi với dáng vẻ lả lơi, hờ hững trên một chiếc ghế sofa cổ hoặc trên sàn',
      },
    ]
  },
  {
    name: 'Tương Tác & Thần Thái',
    poses: [
       {
        id: 'touching_pearls',
        name: 'Tay Chạm Ngọc Trai',
        prompt: 'một tay của chủ thể chạm nhẹ vào chuỗi ngọc trai trên cổ hoặc trên tóc, tạo sự kết nối với trang sức',
      },
      {
        id: 'gaze_in_mirror',
        name: 'Nhìn Vào Gương',
        prompt: 'chủ thể nhìn vào hình ảnh phản chiếu của mình trong gương, biểu cảm trầm tư, bí ẩn',
      },
       {
        id: 'chin_up_power',
        name: 'Thần Thái Quyền Lực',
        prompt: 'chủ thể ngồi thẳng, cằm hơi nâng, hai tay đặt lên đùi hoặc thành ghế, toát lên vẻ tự chủ và quyền lực',
      },
    ]
  },
];
