import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào vẻ đẹp quyến rũ và biểu cảm',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện được trang phục và sự tương tác với bối cảnh',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, khoe trọn vẹn vóc dáng trong bộ váy dạ hội và không gian sang trọng',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'vintage_glamour',
    name: 'Cổ Điển Quyến Rũ',
    prompt: 'tông màu ấm cổ điển, ánh sáng dịu nhẹ từ đèn vàng, có hiệu ứng lấp lánh (bokeh, lens flare) và các hạt bụi sáng bay trong không khí, tạo cảm giác quyến rũ, mờ ảo.',
  },
  {
    id: 'dramatic_red',
    name: 'Đỏ Kịch Tính',
    prompt: 'tông màu đỏ rực làm chủ đạo, tương phản cao, ánh sáng mạnh tập trung vào chủ thể, tạo bóng đổ sâu, mang lại vẻ quyền lực và đầy kịch tính.',
  },
  {
    id: 'soft_focus_dream',
    name: 'Thơ Mộng Mềm Mại',
    prompt: 'hiệu ứng soft-focus (làm mềm nét), màu sắc thơ mộng, ánh sáng khuếch tán, tạo cảm giác như một cảnh trong phim lãng mạn.',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'boudoir_mirror', name: 'Phòng Ngủ & Gương Lớn', prompt: 'bối cảnh phòng ngủ cổ điển với chiếc gương lớn có khung viền hoa văn, đèn ngủ ánh vàng ấm áp.' },
    { id: 'rose_petals', name: 'Giữa Cánh Hoa Hồng', prompt: 'chủ thể nằm hoặc ngồi giữa vô số cánh hoa hồng đỏ trên giường hoặc sàn nhà.' },
    { id: 'blurry_lights', name: 'Nền Bokeh Lấp Lánh', prompt: 'phông nền tối được điểm xuyết bởi các đốm sáng bokeh lấp lánh từ đèn trang trí.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'seductive', name: 'Gợi Cảm', prompt: 'ánh mắt gợi cảm, đôi môi hé mở, biểu cảm tự tin và cuốn hút.' },
    { id: 'dreamy', name: 'Mơ Màng', prompt: 'ánh mắt mơ màng, nhìn xa xăm, biểu cảm có chút suy tư, lãng mạn.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Tương Tác Với Gương',
    poses: [
      {
        id: 'leaning_mirror',
        name: 'Tựa Vào Gương',
        prompt: 'chủ thể tựa vào một chiếc gương lớn, ánh mắt nhìn vào hình ảnh phản chiếu của chính mình một cách đầy suy tư',
      },
      {
        id: 'touching_mirror',
        name: 'Chạm Vào Gương',
        prompt: 'một tay của chủ thể chạm nhẹ lên bề mặt gương, biểu cảm trầm ngâm, tạo cảm giác sâu lắng',
      },
    ]
  },
  {
    name: 'Quyến Rũ & Tự Do',
    poses: [
      {
        id: 'hair_flip',
        name: 'Hất Tóc Bay Bổng',
        prompt: 'chụp khoảnh khắc chủ thể hất mái tóc dài bồng bềnh, tạo cảm giác chuyển động và sự tự do, phóng khoáng',
      },
      {
        id: 'dancing_pose',
        name: 'Khiêu Vũ Dưới Đèn',
        prompt: 'tư thế như đang thực hiện một điệu khiêu vũ, cơ thể uyển chuyển, tay vươn cao, đầy biểu cảm',
      },
       {
        id: 'lying_down_seductive',
        name: 'Nằm Hờ Hững',
        prompt: 'chủ thể nằm trên giường hoặc sàn nhà, giữa những cánh hoa hồng, ánh mắt nhìn thẳng vào ống kính đầy mời gọi',
      },
       {
        id: 'looking_over_shoulder',
        name: 'Ngoảnh Lại Nhìn',
        prompt: 'chủ thể quay lưng nhẹ và ngoảnh đầu lại nhìn qua vai, tạo dáng cổ điển, khoe đường cong cơ thể',
      },
    ]
  },
];
