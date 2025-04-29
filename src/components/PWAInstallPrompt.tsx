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
    // 모바일 기기 체크
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // 인앱 브라우저 체크
    const isInApp = /KAKAOTALK|NAVER|Line|FBAN|FBAV/i.test(navigator.userAgent);

    // 모바일이 아니거나 인앱 브라우저면 프롬프트 표시하지 않음
    if (!isMobile || isInApp) {
      return;
    }

    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS에서는 즉시 프롬프트 표시
    if (isIOSDevice) {
      setShowPrompt(true);
    }

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
