import { useEffect, useState } from 'react';
import './PWAInstallPrompt.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="pwa-prompt-container">
      {isIOS ? (
        <div>
          <h3 className="pwa-prompt-title">Ondolook 앱 설치하기</h3>
          <p className="pwa-prompt-description">
            1. Safari 하단의 공유 버튼을 탭하세요
            <br />
            2. &quot;홈 화면에 추가&quot;를 선택하세요
          </p>
          <button className="pwa-prompt-close-button" onClick={() => setShowPrompt(false)}>
            닫기
          </button>
        </div>
      ) : (
        <div>
          <h3 className="pwa-prompt-title">Ondolook 앱 설치하기</h3>
          <p className="pwa-prompt-description">홈 화면에서 빠르게 접근할 수 있습니다</p>
          <div className="pwa-prompt-button-container">
            <button className="pwa-prompt-install-button" onClick={handleInstallClick}>
              설치하기
            </button>
            <button className="pwa-prompt-close-button" onClick={() => setShowPrompt(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
