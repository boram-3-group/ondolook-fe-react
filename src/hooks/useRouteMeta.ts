import { useMatches } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface RouteHandle {
  title: string;
  isShowBack?: boolean;
  isShowForward?: boolean;
}

export const useRouteMeta = () => {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const routeHandle = currentRoute?.handle as RouteHandle | undefined;

  const [meta, setMeta] = useState<RouteHandle | undefined>(routeHandle);

  useEffect(() => {
    setMeta(routeHandle);
  }, [routeHandle]);

  const setHeaderMeta = (newMeta: Partial<RouteHandle>) => {
    setMeta(prev => {
      if (!prev) return newMeta as RouteHandle;
      return {
        ...prev,
        ...newMeta,
      };
    });
  };

  return { meta, setHeaderMeta };
};
