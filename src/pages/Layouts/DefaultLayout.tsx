import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { useRouteMeta } from '../../hooks/useRouteMeta';

export function DefaultLayout() {
  const { meta } = useRouteMeta();

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-slate-500">
      <Header
        title={meta?.title}
        isShowBack={meta?.isShowBack}
        isShowForward={meta?.isShowForward}
      />
      <div className="w-full h-full overflow-hidden flex-1 bg-red-500">
        <Outlet />
      </div>
    </div>
  );
}
