import { useLocation } from 'react-router-dom';
import { router } from '../pages/Routes';

interface RouteWithMeta {
  path?: string;
  meta?: {
    title: string;
  };
}

export const useRouteMeta = () => {
  const location = useLocation();
  const route = router.routes.find(route => route.path === location.pathname) as RouteWithMeta;
  return { meta: route?.meta };
};
