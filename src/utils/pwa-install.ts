let deferredPrompt: any;

export const initializePWAInstall = () => {
  // 모바일 환경에서만 설치 안내를 띄움
  if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return;
  }
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    // 설치 배너 표시 로직
    setTimeout(() => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      }
    }, 3000); // 3초 후에 설치 배너 표시
  });
};
