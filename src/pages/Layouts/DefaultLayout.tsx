import { Outlet } from 'react-router-dom';
export function DefaultLayout() {
  return (
    // py-12는 추후 header와 footer를 추가할 때 제거할 예정
    <div className="w-full h-full py-12">
      <Outlet />
    </div>
  );
}
