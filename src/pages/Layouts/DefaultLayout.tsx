import { Outlet } from 'react-router-dom';
export function DefaultLayout() {
  return (
    <div className="default-layout p-4">
      <Outlet />
    </div>
  );
}
