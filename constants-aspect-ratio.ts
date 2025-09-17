import type { AspectRatio } from './types';

export const ASPECT_RATIO_OPTIONS: AspectRatio[] = [
  {
    id: '1:1',
    name: 'Vuông',
    prompt: 'tạo ra một bức ảnh có tỷ lệ khung hình vuông 1:1, hoàn hảo cho ảnh đại diện',
  },
  {
    id: '9:16',
    name: 'Dọc',
    prompt: 'tạo ra một bức ảnh có tỷ lệ khung hình dọc 9:16, lý tưởng cho story hoặc ảnh chân dung',
  },
  {
    id: '16:9',
    name: 'Ngang',
    prompt: 'tạo ra một bức ảnh có tỷ lệ khung hình ngang 16:9, phù hợp cho ảnh bìa hoặc ảnh phong cảnh',
  },
];