import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { useRouteMeta } from '../../hooks/useRouteMeta';

export function DefaultLayout() {
  const { meta } = useRouteMeta();

  return (
    <div className="w-full h-full">
      <Header
        title={meta?.title}
        isShowBack={meta?.isShowBack}
        isShowForward={meta?.isShowForward}
      />
      <Outlet />
    </div>
  );
}
