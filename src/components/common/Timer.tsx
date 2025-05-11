import { useEffect, useState } from 'react';

interface TimerProps {
  onExpire: () => void;
}

export const Timer = ({ onExpire }: TimerProps) => {
  const [time, setTime] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            onExpire();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div className="text-primary-40 text-Body2">{formatTime(time)}</div>;
};
