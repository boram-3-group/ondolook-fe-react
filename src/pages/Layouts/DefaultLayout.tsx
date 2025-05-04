import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { useRouteMeta } from '../../hooks/useRouteMeta';

export function DefaultLayout() {
  const { meta } = useRouteMeta();

  return (
    <div className="w-full h-screen overflow-hidden">
      <Header
        title={meta?.title}
        isShowBack={meta?.isShowBack}
        isShowForward={meta?.isShowForward}
      />
      <div className="h-[calc(100%-44px)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
