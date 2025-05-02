import { Icon } from './Icon';

interface WeatherIconProps {
  weather: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}
export const WeatherIcon = ({ weather, width, height, alt }: WeatherIconProps) => {
  const mappedIcon: Record<string, any> = {
    '1': 'clear-sun',
    '2': 'clear-moon',

    '3': 'bit-cloudy-sun',
    '4': 'bit-cloudy-moon',
    '5': 'cloudy-sun',
    '6': 'cloudy-moon',
    '7': 'cloudy',

    '8': 'rain-cloudy-sun',
    '9': 'rain',
    '10': 'bit-rain-sun',
    '11': 'bit-rain-moon',

    '12': 'snow',
    '13': 'clear-moon',
    '14': 'clear-moon',

    '15': 'rain-snow',
    '16': 'cloudy-snow-sun',
    '17': 'cloudy-snow-moon',

    '18': 'bit-cloudy-lightning', //천둥번개

    '19': 'fog',
    '20': 'dust',
  };

  return (
    <Icon name={mappedIcon[weather]} alt={mappedIcon[weather]} width={width} height={height}></Icon>
  );
};
export default WeatherIcon;
