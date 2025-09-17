import type { Fidelity } from './types';

export const FIDELITY_OPTIONS: Fidelity[] = [
  {
    id: 'high',
    name: 'Giữ Gương Mặt (Mặc định)',
    description: 'Ưu tiên giữ lại tối đa đặc điểm khuôn mặt gốc, phù hợp cho chân dung.',
  },
  {
    id: 'standard',
    name: 'Sáng tạo',
    description: 'Cho phép AI linh hoạt hơn để thay đổi khuôn mặt cho hợp với phong cách.',
  },
];
