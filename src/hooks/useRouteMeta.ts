import { useMatches } from 'react-router-dom';

interface RouteHandle {
  title: string;
  isShowBack?: boolean;
  isShowForward?: boolean;
}

export const useRouteMeta = () => {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const handle = currentRoute?.handle as RouteHandle | undefined;

  return { meta: handle };
};
