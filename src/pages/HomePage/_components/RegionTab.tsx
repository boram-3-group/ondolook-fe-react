import { Icon } from '../../../components/common/Icon';
import { RegionResponse } from '../type';

export const RegionTab = ({ sggnm, sidonm }: RegionResponse) => {
  return (
    <>
      <div className="flex">
        <Icon name="location" width={24} height={24} alt="위치" />
        <div className="text-Title1">{`${sidonm} ${sggnm}`}</div>
      </div>
    </>
  );
};
