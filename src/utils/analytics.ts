import ReactGA from 'react-ga4';

export const initGA = (userId?: string) => {
  ReactGA.initialize('G-ZVRHXDJMQX');
};

export const trackSignUp = ({
  userId,
  login_type,
}: {
  userId: string | undefined;
  login_type: string;
}) => {
  ReactGA.event('user_signup_log', {
    user_id: userId,
    login_type,
    timestamp: Date.now(),
  });
};

export const trackSelectSchedule = ({ userId, type }: { userId: string; type: string }) => {
  ReactGA.set({ user_id: userId });
  ReactGA.event('select_schedule', {
    user_id: userId,
    type,
    timestamp: Date.now(),
  });
};

export const trackViewCoordi = ({
  userId,
  type,
  temp,
}: {
  userId: string;
  type: string | undefined;
  temp: number | undefined;
}) => {
  ReactGA.event('view_coordi', {
    user_id: userId,
    type,
    temp,
    timestamp: Date.now(),
  });
};

export const trackAlarmSetting = ({
  userId,
  is_enabled,
  set_time,
}: {
  userId: string;
  is_enabled: boolean;
  set_time: string;
}) => {
  ReactGA.event('alarm_setting_log', {
    user_id: userId,
    is_enabled,
    set_time,
    timestamp: Date.now(),
  });
};
