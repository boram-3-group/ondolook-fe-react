import { Outlet } from 'react-router-dom';
export function EmptyLayout() {
  return (
    <div className="aa w-full h-screen">
      <Outlet />
    </div>
  );
}
