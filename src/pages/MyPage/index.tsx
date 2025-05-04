import { Icon } from '../../components/common/Icon';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-4 mt-8 w-full min-h-full bg-white">
      <div className="flex flex-col gap-1 mb-8">
        <span className="leading-[150%] text-[#000] text-[20px] font-bold ">온도룩</span>
        <span className="text-gray-600">{user?.username || ''}</span>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-gray-50 p-4 mb-4">
        <div className="text-xs font-medium leading-[150%] text-[#8E8E8E] ">활동 및 소식</div>
        <button
          className="flex w-full items-center justify-between "
          onClick={() => navigate('/my/bookmark')}
        >
          <div className="flex items-center">
            <Icon name="bookmark" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D]">나의 북마크</div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
        <button
          className="flex w-full items-center justify-between"
          onClick={() => navigate('/my/notice')}
        >
          <div className="flex items-center">
            <Icon name="announcement" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D] ">공지사항</div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-gray-50 p-4 mb-4">
        <span className="text-xs font-medium leading-[150%] text-[#8E8E8E] ">설정</span>
        <button
          className="flex w-full items-center justify-between"
          onClick={() => navigate('/my/user-info')}
        >
          <div className="flex items-center">
            <Icon name="edit" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D] ">
              회원 정보 설정
            </div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
        <button className="flex w-full items-center justify-between ">
          <div className="flex items-center ">
            <Icon name="settings" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D] ">계정 설정</div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
        <button
          className="flex w-full items-center justify-between"
          onClick={() => navigate('/my/alarm')}
        >
          <div className="flex items-center">
            <Icon name="bell" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D] ">알림 설정</div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-gray-50 p-4">
        <span className="text-xs font-medium leading-[150%] text-[#8E8E8E] ">고객지원</span>
        <button className="flex w-full items-center justify-between ">
          <div className="flex items-center">
            <Icon name="annotation-dots" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D] ">의견 남기기</div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
        <button
          className="flex w-full items-center justify-between"
          onClick={() => navigate('/my/policy')}
        >
          <div className="flex items-center">
            <Icon name="alert-circle" width={16} height={16} className="mr-2" />
            <div className="text-base font-medium leading-[150%] text-[#2D2D2D] ">약관 및 정책</div>
          </div>
          <span>
            <Icon name="chevron-right" width={16} height={16} />
          </span>
        </button>
      </div>
    </div>
  );
};
