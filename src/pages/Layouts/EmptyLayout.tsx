import { Outlet } from 'react-router-dom';
export function EmptyLayout() {
  return (
    <div className="w-full h-screen bg-slate-500">
      <Outlet />
    </div>
  );
}
