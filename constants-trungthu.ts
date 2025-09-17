import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào biểu cảm và vẻ đẹp khuôn mặt',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người, thể hiện được trang phục, tay và đạo cụ',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, thể hiện trọn vẹn dáng người, trang phục và bối cảnh nghệ thuật',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'rich_red',
    name: 'Tông Đỏ Rực Rỡ',
    prompt: 'sử dụng tông màu đỏ làm chủ đạo, màu sắc rực rỡ, tương phản cao, ánh sáng studio làm nổi bật khối và chi tiết, tạo cảm giác sang trọng, lễ hội',
  },
  {
    id: 'soft_dreamy',
    name: 'Dịu Dàng & Thơ Mộng',
    prompt: 'phong cách ảnh thơ mộng, ánh sáng mềm mại, khuếch tán, có thể có hiệu ứng sương khói nhẹ hoặc bokeh, tông màu ấm áp, lãng mạn',
  },
  {
    id: 'dramatic_light',
    name: 'Ánh Sáng Kịch Tính',
    prompt: 'sử dụng ánh sáng mạnh và bóng đổ sâu để tạo kịch tính, làm nổi bật đường nét cơ thể và trang phục, phong cách high-fashion',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'red_studio_backdrop', name: 'Phông Nền Đỏ Studio', prompt: 'phông nền là một tấm phông trơn màu đỏ rực hoặc đỏ đậm trong studio, có thể có thêm một vòng tròn lớn tượng trưng cho mặt trăng.' },
    { id: 'traditional_decor', name: 'Bối Cảnh Cổ Truyền', prompt: 'phông nền được trang trí với các vật dụng cổ truyền Việt Nam như bình phong, lồng chim, bộ ấm trà, cành hoa đào hoặc mai.' },
    { id: 'lantern_glow', name: 'Không Gian Đèn Lồng', prompt: 'phông nền là một không gian mờ ảo với nhiều đèn lồng treo cao, tạo ra hiệu ứng bokeh lung linh.' },
    { id: 'minimalist_texture', name: 'Nền Tối Giản', prompt: 'phông nền tối giản, có thể là một bức tường xi măng hoặc vải bố, tập trung hoàn toàn vào chủ thể.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'original', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên của chủ thể.' },
    { id: 'seductive_gaze', name: 'Kiêu Kỳ, Cuốn Hút', prompt: 'thể hiện một ánh nhìn kiêu kỳ, cuốn hút, đôi môi hé mở nhẹ nhàng.' },
    { id: 'pensive', name: 'Trầm Tư, E Ấp', prompt: 'biểu cảm trầm tư, ánh mắt nhìn xa xăm, thể hiện vẻ đẹp nội tâm, e ấp.' },
    { id: 'gentle_smile', name: 'Cười Mỉm Dịu Dàng', prompt: 'một nụ cười mỉm nhẹ nhàng, thanh thoát, ánh mắt hiền hòa.' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Duyên Dáng Cùng Đạo Cụ',
    poses: [
      {
        id: 'pose_pomegranate',
        name: 'Nâng Cành Lựu Đỏ',
        prompt: 'chủ thể ngồi, một tay nâng nhẹ cành lựu đỏ, tay còn lại đặt duyên dáng, ánh mắt nhìn vào ống kính',
      },
      {
        id: 'pose_lion_head',
        name: 'Tựa Bên Đầu Lân',
        prompt: 'chủ thể đứng hoặc ngồi, nghiêng mình duyên dáng bên cạnh một chiếc đầu lân sặc sỡ, một tay chạm nhẹ vào đầu lân',
      },
      {
        id: 'pose_birdcage',
        name: 'An Nhiên Với Lồng Chim',
        prompt: 'chủ thể ngồi, một tay cầm chiếc lồng chim cổ, ánh mắt nhìn xa xăm, tạo vẻ bình yên',
      },
    ]
  },
  {
    name: 'Nét Đẹp Hình Thể',
    poses: [
      {
        id: 'pose_show_back',
        name: 'Khoe Tấm Lưng Trần',
        prompt: 'chủ thể quay lưng về phía máy ảnh, khoe tấm lưng trần gợi cảm của áo yếm, đầu ngoảnh lại nhìn qua vai',
      },
      {
        id: 'pose_hand_on_neck',
        name: 'Tay Thờ Ơ Trên Cổ',
        prompt: 'chủ thể đưa một tay lên chạm hờ vào gáy hoặc xương quai xanh, ánh mắt kiêu kỳ, cuốn hút',
      },
       {
        id: 'pose_sitting_graceful',
        name: 'Dáng Ngồi Thanh Tú',
        prompt: 'chủ thể ngồi trên sàn hoặc ghế thấp, hai tay đặt mềm mại lên đùi hoặc bên cạnh, dáng người thẳng, toát lên vẻ thanh lịch',
      },
    ]
  },
];
