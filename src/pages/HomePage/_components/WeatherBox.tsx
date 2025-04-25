import { Icon } from '../../../components/common/Icon';

export const WeatherBox = () => {
  return (
    <div className="flex px-4 py-1 border rounded-xl gap-[12px] items-center">
      <div className="text-5xl font-medium leading-[150%]">22°</div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-[6px]">
            <Icon name="clear-sun" width={20} height={20} alt="맑음" />
            <span className="text-Body1 font-medium">맑음</span>
          </div>
          <div className="text-Detail text-grayScale-60 ">
            <span className="">↓6°</span>
            <span className="">↑30°</span>
          </div>
        </div>
        <div className="text-Body2 text-grayScale-70">오후 6시부터 비 예보, 우산 필요!</div>
      </div>
    </div>
  );
};
