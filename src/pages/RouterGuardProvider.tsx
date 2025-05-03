import { useEffect, useRef } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

type RouterGuard = {
  beforeEnter?: (params: {
    to: string;
    from: string;
    next: (shouldProceed?: boolean | string) => void;
    store: ReturnType<typeof useStore>;
  }) => void;
  afterEnter?: (params: { to: string; from: string; store: ReturnType<typeof useStore> }) => void;
};

type RouterGuardProviderProps = {
  guards: RouterGuard;
};

export const RouterGuardProvider = ({ guards }: RouterGuardProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const stores = useStore();
  const previousPathRef = useRef<string>('');
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }

    if (guards.beforeEnter) {
      isNavigatingRef.current = true;
      guards.beforeEnter({
        to: currentPath,
        from: previousPathRef.current,
        next: path => {
          if (path === false) {
            navigate(previousPathRef.current);
          } else if (typeof path === 'string') {
            navigate(path);
          }
        },
        store: stores,
      });
    }
  }, [currentPath]);

  useEffect(() => {
    if (guards.afterEnter) {
      guards.afterEnter({
        to: currentPath,
        from: previousPathRef.current,
        store: stores,
      });
    }
    previousPathRef.current = currentPath;
  }, [currentPath]);

  return <Outlet />;
};
