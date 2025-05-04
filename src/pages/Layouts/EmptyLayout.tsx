import { Outlet } from 'react-router-dom';
export function EmptyLayout() {
  return (
    <div className="w-full max-h-dvh">
      <Outlet />
    </div>
  );
}
