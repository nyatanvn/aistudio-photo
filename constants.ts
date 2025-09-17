import type { PoseCategory, Framing, ImageStyle, Background, Expression } from './types';

export const FRAMING_OPTIONS: Framing[] = [
  {
    id: 'portrait',
    name: 'Chân dung',
    prompt: 'chụp cận cảnh chân dung, tập trung vào biểu cảm khuôn mặt',
  },
  {
    id: 'half_body',
    name: 'Nửa người',
    prompt: 'chụp nửa người từ thắt lưng trở lên, cho thấy cả tay và thân trên',
  },
  {
    id: 'full_body',
    name: 'Toàn thân',
    prompt: 'chụp toàn thân, thể hiện toàn bộ trang phục và dáng đứng',
  },
];

export const IMAGE_STYLE_OPTIONS: ImageStyle[] = [
  {
    id: 'classic_bw',
    name: 'Đen trắng tương phản',
    prompt: 'đen trắng hoàn toàn, độ tương phản cao, sắc nét, phong cách phim ảnh cổ điển',
  },
  {
    id: 'bw_skin_tone',
    name: 'Đen trắng & màu da',
    prompt: 'ảnh đen trắng nghệ thuật, nhưng giữ lại tông màu da ấm áp tự nhiên, tạo hiệu ứng color pop tinh tế trên da',
  },
  {
    id: 'sun_stream',
    name: 'Nắng chiếu',
    prompt: 'ánh sáng mặt trời gay gắt chiếu xiên qua cửa sổ, tạo ra các vệt sáng và bóng tối mạnh mẽ trên chủ thể',
  },
  {
    id: 'neon_light',
    name: 'Ánh sáng Neon',
    prompt: 'ánh sáng neon màu xanh và hồng chiếu vào chủ thể, tạo ra phản xạ trên da và quần áo, không khí cyberpunk',
  },
   {
    id: 'soft_light',
    name: 'Ánh sáng mềm',
    prompt: 'ánh sáng studio mềm mại, khuếch tán từ softbox, giảm thiểu bóng tối, làm nổi bật vẻ đẹp một cách tự nhiên',
  },
];

export const BACKGROUND_OPTIONS: Background[] = [
    { id: 'dark_studio', name: 'Studio Tối', prompt: 'phông nền studio màu xám đậm hoặc đen tuyền, tối giản, làm nổi bật chủ thể.' },
    { id: 'textured_wall', name: 'Tường Họa Tiết', prompt: 'phông nền là một bức tường có họa tiết tinh tế, ví dụ như tường bê tông, tường gạch cũ hoặc vải canvas.' },
    { id: 'window_light_bg', name: 'Cạnh Cửa Sổ', prompt: 'phông nền có một cửa sổ lớn, ánh sáng tự nhiên mềm mại chiếu vào, tạo cảm giác không gian mở.' },
    { id: 'abstract_blur', name: 'Phông Nền Mờ', prompt: 'phông nền là các vệt sáng hoặc hình khối trừu tượng, được làm mờ (bokeh), tạo chiều sâu cho ảnh.' },
];

export const EXPRESSION_OPTIONS: Expression[] = [
    { id: 'neutral', name: 'Giữ Nguyên Gốc', prompt: 'giữ nguyên biểu cảm tự nhiên trên khuôn mặt của chủ thể trong ảnh gốc.' },
    { id: 'slight_smile', name: 'Cười Mỉm', prompt: 'thêm một nụ cười mỉm nhẹ nhàng, tự nhiên và thân thiện trên khuôn mặt chủ thể.' },
    { id: 'serious', name: 'Nghiêm Túc', prompt: 'tạo một biểu cảm nghiêm túc, trầm tư, ánh mắt có chiều sâu.' },
    { id: 'confident', name: 'Tự Tin', prompt: 'thể hiện một biểu cảm tự tin, cằm hơi nâng nhẹ, ánh mắt quyết đoán.' },
];


export const POSE_CATEGORIES: PoseCategory[] = [
  {
    name: 'Cổ Điển & Tự Tin',
    poses: [
      {
        id: 'confident_turtleneck',
        name: 'Phong Thái Tự Tin',
        prompt: 'chủ thể mặc áo cổ lọ tối màu, khoanh tay trước ngực, ánh nhìn thẳng vào ống kính, điềm tĩnh và đầy tự tin, ánh sáng làm nổi bật đường nét khuôn mặt',
      },
      {
        id: 'bold_direct_gaze',
        name: 'Ánh Nhìn Trực Diện',
        prompt: 'nhìn thẳng, trực diện vào máy ảnh với một ánh nhìn mạnh mẽ, đầy tự tin và cuốn hút, ánh sáng làm nổi bật cấu trúc xương mặt',
      },
      {
        id: 'relaxed_tshirt',
        name: 'Thoải Mái Áo Thun',
        prompt: 'chủ thể mặc áo thun đơn giản, dáng đứng hơi nghiêng, ánh mắt nhìn xuống nhẹ, tạo cảm giác thư thái và gần gũi',
      },
      {
        id: 'hoodie_gaze_away',
        name: 'Góc Nhìn Xa Xăm',
        prompt: 'chủ thể mặc áo hoodie, đầu hơi nghiêng, mắt nhìn ra xa khỏi ống kính, tạo vẻ ngoài suy tư và có chút bí ẩn',
      },
      {
        id: 'indifferent_lean',
        name: 'Tựa Vai Hững Hờ',
        prompt: 'chủ thể tựa vai vào một bức tường, cơ thể thả lỏng, mặc áo khoác blazer, ánh mắt nhìn lơ đãng ra xa, tạo cảm giác phóng khoáng và tự do',
      },
       {
        id: 'look_back',
        name: 'Cái Nhìn Ngoảnh Lại',
        prompt: 'chủ thể quay lưng nhẹ về phía máy ảnh nhưng ngoảnh đầu lại nhìn qua vai, tạo sự tò mò và một câu chuyện ẩn giấu, ánh sáng ven (rim light) làm nổi bật đường viền',
      },
    ]
  },
  {
    name: 'Năng Động & Biểu Cảm',
    poses: [
      {
        id: 'hands_framing_face',
        name: 'Đôi Tay Khung Hình',
        prompt: 'chủ thể dùng hai bàn tay tạo thành một khung hình tinh tế quanh mặt, hướng sự chú ý vào ánh nhìn đầy biểu cảm',
      },
      {
        id: 'dynamic_kick',
        name: 'Cú Đá Năng Lượng',
        prompt: 'chụp khoảnh khắc hành động, chủ thể thực hiện một cú đá hoặc bước nhảy, trang phục bay theo chuyển động, toát lên năng lượng và sức mạnh',
      },
       {
        id: 'expressive_shout',
        name: 'Hét Lên Sảng Khoái',
        prompt: 'chủ thể thể hiện cảm xúc mạnh mẽ như hét lớn, cười sảng khoái hoặc ngạc nhiên, ghi lại một khoảnh khắc chân thật và đầy sức sống',
      },
      {
        id: 'hand_over_face',
        name: 'Bàn Tay Che Mặt',
        prompt: 'một bàn tay đưa ra phía trước, che một phần ống kính hoặc khuôn mặt, tạo hiệu ứng mờ ảo và một cảm giác vui tươi, tự nhiên',
      },
      {
        id: 'quirky_glasses',
        name: 'Cặp Kính Tinh Nghịch',
        prompt: 'chủ thể đeo kính, có thể đẩy nhẹ gọng kính hoặc nhìn qua mép trên của kính với một biểu cảm tinh nghịch hoặc trí thức',
      },
       {
        id: 'pensive_stress',
        name: 'Trán Nhăn Suy Tư',
        prompt: 'một tay đặt lên trán, ngón tay chạm vào thái dương, biểu cảm khuôn mặt trầm ngâm và đầy suy tư, thể hiện sự tập trung cao độ hoặc một chút căng thẳng',
      },
    ]
  },
  {
    name: 'Nghệ Thuật & Thời Trang Cao Cấp',
    poses: [
       {
        id: 'pensive_gaze',
        name: 'Suy Tư Trầm Lắng',
        prompt: 'chủ thể ngồi trên ghế, người hơi nghiêng về phía trước, một tay chống nhẹ lên cằm hoặc má, ánh mắt nhìn xa xăm đầy suy tư, mặc vest tối màu',
      },
      {
        id: 'seated_power',
        name: 'Thế Ngồi Quyền Lực',
        prompt: 'chủ thể ngồi ngược trên ghế, hai tay đặt lên lưng ghế, ánh mắt nhìn thẳng vào ống kính, thể hiện sự tự tin và kiểm soát',
      },
      {
        id: 'fashion_crouch',
        name: 'Dáng Ngồi Xổm',
        prompt: 'chủ thể ngồi xổm trên sàn, hai tay đặt tự nhiên trên đầu gối hoặc sàn, tạo ra một hình khối cơ thể thú vị và đậm chất thời trang',
      },
      {
        id: 'shadow_play',
        name: 'Chơi Đùa Cùng Bóng Tối',
        prompt: 'chủ thể ngồi trong vùng tối, chỉ có một phần cơ thể hoặc khuôn mặt được chiếu sáng, tạo cảm giác bí ẩn và chiều sâu nghệ thuật',
      },
      {
        id: 'artistic_hands_face',
        name: 'Đôi Tay Nghệ Thuật',
        prompt: 'hai bàn tay được đặt gần hoặc обрамляя khuôn mặt một cách mềm mại, tạo dáng nghệ thuật để nhấn mạnh biểu cảm',
      },
      {
        id: 'elegant_profile',
        name: 'Góc Nghiêng Thanh Lịch',
        prompt: 'chụp góc nghiêng 90 độ, làm nổi bật đường nét xương hàm và sống mũi, cằm hơi hạ xuống, mắt nhìn xa xăm, thể hiện sự thanh lịch và nội tâm',
      },
    ]
  },
   {
    name: 'Dáng Đứng Toàn Thân',
    poses: [
      {
        id: 'full_body_lean',
        name: 'Tựa Tường Phong Cách',
        prompt: 'chủ thể đứng toàn thân, một vai tựa vào tường, chân bắt chéo, hai tay có thể đút túi quần, tạo vẻ ngoài thư thái và ngầu',
      },
      {
        id: 'contrapposto_pose',
        name: 'Dáng Contrapposto',
        prompt: 'chủ thể đứng toàn thân theo dáng contrapposto cổ điển, trọng lượng dồn vào một chân, hông và vai nghiêng ngược chiều nhau, tạo đường cong S tự nhiên cho cơ thể',
      },
      {
        id: 'walking_stride',
        name: 'Sải Bước Tự Tin',
        prompt: 'chụp khoảnh khắc chủ thể đang sải bước về phía trước, một chân co, một chân duỗi, cơ thể hơi nghiêng, toát lên vẻ tự tin và đầy năng lượng',
      },
      {
        id: 'hands_in_pockets',
        name: 'Tay Đút Túi Quần',
        prompt: 'chủ thể đứng thẳng, hai tay đút trong túi quần, ánh mắt nhìn thẳng hoặc hơi lệch đi, thể hiện sự thoải mái, tự nhiên nhưng vẫn có chút điềm tĩnh',
      },
       {
        id: 'powerful_stance',
        name: 'Thế Đứng Vững Chãi',
        prompt: 'chủ thể đứng hai chân rộng bằng vai, thể hiện sự vững chãi và quyền lực, tay có thể khoanh trước ngực hoặc chống hông',
      },
    ],
  },
  {
    name: 'Chuyên Nghiệp & Quyền Lực',
    poses: [
      {
        id: 'rembrandt_light',
        name: 'Ánh Sáng Rembrandt',
        prompt: 'sử dụng kỹ thuật ánh sáng Rembrandt, tạo một tam giác sáng nhỏ dưới mắt ở phía tối của khuôn mặt, mang lại chiều sâu và cảm xúc kịch tính',
      },
      {
        id: 'high_fashion_cool',
        name: 'Chất Ngầu Thời Trang',
        prompt: 'phong cách high-fashion, chủ thể mặc suit với áo sơ mi, tóc vuốt ngược, ánh mắt sắc lẹm, một tay có thể chạm nhẹ thái dương hoặc ve áo',
      },
      {
        id: 'dominating_space',
        name: 'Thống Lĩnh Không Gian',
        prompt: 'chủ thể ngồi trên ghế với dáng vẻ quyền lực, có thể vắt chéo chân hoặc ngồi dạng chân rộng, tay đặt lên thành ghế, toát lên vẻ tự chủ và thống trị',
      },
      {
        id: 'deep_gaze',
        name: 'Ánh Nhìn Sâu Thẳm',
        prompt: 'một biểu cảm sâu sắc, tập trung vào đôi mắt, truyền tải cảm xúc nội tâm và những suy nghĩ không lời',
      },
      {
        id: 'mysterious_silhouette',
        name: 'Bóng Lưng Bí Ẩn',
        prompt: 'chụp ngược sáng tạo thành bóng đen (silhouette) của chủ thể trên nền sáng, chỉ lộ ra đường nét cơ thể, đầy bí ẩn và nghệ thuật',
      },
    ]
  },
  {
    name: 'Góc Chụp Phá Cách & Đường Phố',
    poses: [
      {
        id: 'worms_eye_view',
        name: 'Góc Nhìn Từ Dưới Lên',
        prompt: 'chụp từ góc cực thấp hướng lên bằng ống kính góc rộng, chủ thể nhìn xuống ống kính với vẻ tự tin, tạo cảm giác quyền lực và cao lớn, phông nền là bầu trời hoặc trần nhà studio.',
      },
      {
        id: 'reaching_hand',
        name: 'Bàn Tay Vươn Tới',
        prompt: 'chụp từ góc thấp, một bàn tay của chủ thể vươn thẳng về phía ống kính, mất nét nhẹ ở tiền cảnh, tạo hiệu ứng chiều sâu và cảm giác tương tác mạnh mẽ.',
      },
      {
        id: 'jpop_energy',
        name: 'Năng Lượng J-Pop',
        prompt: 'tư thế năng động và vui tươi, chủ thể nhảy nhẹ, một tay tạo dáng chữ V gần mắt, nháy mắt tinh nghịch, phong cách đường phố Nhật Bản.',
      },
      {
        id: 'urban_crouch',
        name: 'Ngồi Xổm Đường Phố',
        prompt: 'chủ thể ngồi xổm, chụp từ góc thấp bằng ống kính góc rộng, tạo hiệu ứng phối cảnh ấn tượng, nhấn mạnh vào giày và trang phục, biểu cảm ngầu.',
      },
      {
        id: 'lens_block',
        name: 'Bàn Tay "Cản" Ống Kính',
        prompt: 'chủ thể đưa bàn tay mở rộng ra như để che hoặc "cản" ống kính, nhưng nhìn qua kẽ tay với ánh mắt sắc sảo và nụ cười nửa miệng.',
      },
      {
        id: 'dynamic_high_kick',
        name: 'Cú Đá Tung Trời',
        prompt: 'chụp từ góc thấp với ống kính góc rộng, bắt trọn khoảnh khắc chủ thể tung cú đá lên cao, thể hiện sự nổi loạn và năng lượng bùng nổ, quần áo bay theo chuyển động.',
      },
       {
        id: 'fisheye_perspective',
        name: 'Phối Cảnh Mắt Cá',
        prompt: 'sử dụng hiệu ứng ống kính mắt cá (fisheye), chụp từ trên cao xuống hoặc từ dưới lên, làm biến dạng phối cảnh một cách nghệ thuật, tạo ra một bức ảnh độc đáo và vui nhộn.',
      },
    ]
  }
];
