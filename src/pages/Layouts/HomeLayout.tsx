import { Outlet } from 'react-router-dom';

export function HomeLayout() {
  const backgroundImage = '/bg-sunny.svg';
  return (
    <div
      className="w-full h-full"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <Outlet />
    </div>
  );
}
