import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { useRouteMeta } from '../../hooks/useRouteMeta';

export function DefaultLayout() {
  const { meta } = useRouteMeta();

  return (
    <div className="flex flex-col flex-1">
      <Header
        title={meta?.title}
        isShowBack={meta?.isShowBack}
        isShowForward={meta?.isShowForward}
      />
      <div className="overflow-hidden flex-1">
        <Outlet />
      </div>
    </div>
  );
}
