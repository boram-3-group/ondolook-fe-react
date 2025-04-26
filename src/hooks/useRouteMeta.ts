import { useLocation } from 'react-router-dom';
import { router } from '../pages/Routes';

interface RouteWithMeta {
  path?: string;
  meta?: {
    title: string;
  };
  children?: RouteWithMeta[];
}

const findRouteWithPath = (
  routes: RouteWithMeta[],
  pathname: string
): RouteWithMeta | undefined => {
  for (const route of routes) {
    if (route.path === pathname) {
      return route;
    }
    if (route.children) {
      const found = findRouteWithPath(route.children, pathname);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

export const useRouteMeta = () => {
  const location = useLocation();
  const route = findRouteWithPath(router.routes, location.pathname);

  return { meta: route?.meta };
};
