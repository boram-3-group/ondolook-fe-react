export const serviceUrl = {
  base_url: import.meta.env.VITE_APP_API_BASE_URL,
};

export const Categories = [
  { id: '1', categoryName: '일상/모임', value: 'daily' },
  { id: '2', categoryName: '출근/비즈니스', value: 'business' },
  { id: '3', categoryName: '약속/데이트', value: 'date' },
  { id: '4', categoryName: '운동/액티비티', value: 'activity' },
];

export const steps = ['인증', '계정입력', '프로필입력', '가입완료'];
