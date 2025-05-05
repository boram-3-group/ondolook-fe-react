import { useStore } from '../store';

interface RouterGuard {
  to?: string;
  from?: string;
  next: (shouldProceed?: boolean | string) => void;
  store: ReturnType<typeof useStore>;
}

export const guards = {
  beforeEnter: async ({ to, next, store }: RouterGuard) => {
    const isLoggedIn = store.userStore.isLoggedIn();
    console.log('to : ', to);
    if (to === '/my/bookmark') {
      if (!isLoggedIn) {
        next(false);
        return;
      }
    }

    next(true);
  },
  // afterEnter: async ({ to, from }: RouterGuard) => {},
};
