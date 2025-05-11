import { Icon } from '../../../components/common/Icon';
import { RegionResponse } from '../type';

export const RegionTab = ({ sggnm, sidonm }: RegionResponse) => {
  return (
    <>
      <div className="flex pt-1">
        <Icon name="location" width={24} height={24} alt="위치" />
        <div className="ml-2 text-Title1 -translate-y-[2px]">{`${sidonm} ${sggnm}`}</div>
      </div>
    </>
  );
};
