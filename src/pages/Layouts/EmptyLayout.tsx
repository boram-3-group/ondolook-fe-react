import { Outlet } from 'react-router-dom';
export function EmptyLayout() {
  return (
    <div className="w-full flex-1">
      <Outlet />
    </div>
  );
}
