/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import alert_circle from '../../assets/icons/alert-circle.svg';
import annotation_dots from '../../assets/icons/annotation-dots.svg';
import announcement from '../../assets/icons/announcement.svg';
import bell from '../../assets/icons/bell.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import blue_bookmark from '../../assets/icons/blue-bookmark.svg';
import white_bookmark from '../../assets/icons/white-bookmark.svg';
import chevron_left from '../../assets/icons/chevron-left.svg';
import chevron_right from '../../assets/icons/chevron-right.svg';
import edit from '../../assets/icons/edit.svg';
import icon_google_logo from '../../assets/icons/icon-google-logo.svg';
import icon_kakao_logo from '../../assets/icons/icon-kakao-logo.svg';
import settings from '../../assets/icons/settings.svg';
import location from '../../assets/icons/location.svg';
import home from '../../assets/icons/home.svg';
import mypage from '../../assets/icons/mypage.svg';
import blue_check from '../../assets/icons/blue-check.svg';
import white_check from '../../assets/icons/white-check.svg';
import small_button from '../../assets/icons/small-button.svg';

import bit_cloudy_lightning from '../../assets/icons/bit-cloudy-lightning.png';
import bit_cloudy_moon from '../../assets/icons/bit-cloudy-moon.png';
import bit_cloudy_sun from '../../assets/icons/bit-cloudy-sun.png';
import bit_rain_moon from '../../assets/icons/bit-rain-moon.png';
import bit_rain_sun from '../../assets/icons/bit-rain-sun.png';
import clear_moon from '../../assets/icons/clear-moon.png';
import clear_sun from '../../assets/icons/clear-sun.png';
import cloudy_moon from '../../assets/icons/cloudy-moon.png';
import cloudy_rain_snow_moon from '../../assets/icons/cloudy-rain-snow-moon.png';
import cloudy_rain_snow_sun from '../../assets/icons/cloudy-rain-snow-sun.png';
import cloudy_snow_moon from '../../assets/icons/cloudy-snow-moon.png';
import cloudy_snow_sun from '../../assets/icons/cloudy-snow-sun.png';
import cloudy_sun from '../../assets/icons/cloudy-sun.png';
import cloudy from '../../assets/icons/cloudy.png';
import dust from '../../assets/icons/dust.png';
import fog from '../../assets/icons/fog.png';
import rain_cloudy_sun from '../../assets/icons/rain-cloudy-sun.png';
import rain_snow from '../../assets/icons/rain-snow.png';
import rain from '../../assets/icons/rain.png';
import snow from '../../assets/icons/snow.png';
import ondo_logo_small from '../../assets/icons/ondo-logo-small.png';

type IconName =
  | 'alert-circle'
  | 'annotation-dots'
  | 'announcement'
  | 'bell'
  | 'bookmark'
  | 'blue-bookmark'
  | 'white-bookmark'
  | 'chevron-left'
  | 'chevron-right'
  | 'edit'
  | 'icon-google-logo'
  | 'icon-kakao-logo'
  | 'settings'
  | 'location'
  | 'home'
  | 'mypage'
  | 'blue-check'
  | 'white-check'
  | 'small-button'
  | 'bit-cloudy-lightning'
  | 'bit-cloudy-moon'
  | 'bit-cloudy-sun'
  | 'bit-rain-moon'
  | 'bit-rain-sun'
  | 'clear-moon'
  | 'clear-sun'
  | 'cloudy-moon'
  | 'cloudy-rain-snow-moon'
  | 'cloudy-rain-snow-sun'
  | 'cloudy-snow-moon'
  | 'cloudy-snow-sun'
  | 'cloudy-sun'
  | 'cloudy'
  | 'dust'
  | 'fog'
  | 'rain-cloudy-sun'
  | 'rain-snow'
  | 'rain'
  | 'snow'
  | 'ondo-logo-small';

const iconMap: Record<IconName, any> = {
  'alert-circle': alert_circle,
  'annotation-dots': annotation_dots,
  announcement: announcement,
  bell: bell,
  bookmark: bookmark,
  'blue-bookmark': blue_bookmark,
  'white-bookmark': white_bookmark,
  'chevron-left': chevron_left,
  'chevron-right': chevron_right,
  edit: edit,
  'icon-google-logo': icon_google_logo,
  'icon-kakao-logo': icon_kakao_logo,
  settings: settings,
  location: location,
  home: home,
  mypage: mypage,
  'blue-check': blue_check,
  'white-check': white_check,
  'small-button': small_button,
  'bit-cloudy-lightning': bit_cloudy_lightning,
  'bit-cloudy-moon': bit_cloudy_moon,
  'bit-cloudy-sun': bit_cloudy_sun,
  'bit-rain-moon': bit_rain_moon,
  'bit-rain-sun': bit_rain_sun,
  'clear-moon': clear_moon,
  'clear-sun': clear_sun,
  'cloudy-moon': cloudy_moon,
  'cloudy-rain-snow-moon': cloudy_rain_snow_moon,
  'cloudy-rain-snow-sun': cloudy_rain_snow_sun,
  'cloudy-snow-moon': cloudy_snow_moon,
  'cloudy-snow-sun': cloudy_snow_sun,
  'cloudy-sun': cloudy_sun,
  cloudy: cloudy,
  dust: dust,
  fog: fog,
  'rain-cloudy-sun': rain_cloudy_sun,
  'rain-snow': rain_snow,
  rain: rain,
  snow: snow,
  'ondo-logo-small': ondo_logo_small,
};

interface IconProps {
  name: IconName;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
  stroke?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  className = '',
  alt = '',
  stroke,
  onClick,
}) => {
  const IconComponent = iconMap[name];

  if (typeof IconComponent === 'function') {
    return (
      <IconComponent
        width={width}
        height={height}
        className={className}
        style={stroke ? { stroke: stroke } : undefined}
        onClick={onClick}
      />
    );
  }

  return (
    <img
      src={IconComponent}
      width={width}
      height={height}
      className={className}
      alt={alt || name}
      style={stroke ? { stroke: stroke } : undefined}
    />
  );
};
