import { Icon } from '../../components/common/Icon';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  const { user, socialType } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-4 pt-8 w-full min-h-full bg-white">
      <div className="flex-1">
        <div className="flex flex-col gap-1 mb-8">
          <span className="pl-1 text-[#000] text-[20px] font-bold leading-[150%] font-['Pretendard'] font-feature-settings: 'liga' off, 'clig' off">
            {user?.nickname || ''}
          </span>

          <span className="text-gray-600 flex items-center gap-1 font-[14px]">
            {socialType && socialType === 'kakao' ? (
              <Icon name="icon-kakao-logo" width={16} height={16} />
            ) : socialType && socialType === 'google' ? (
              <Icon name="icon-google-logo" width={16} height={16} />
            ) : (
              ''
            )}
            {user?.username || ''}
          </span>
        </div>

        <div className="flex flex-col items-start self-stretch rounded-xl bg-gray-50 p-4 mb-4">
          <div className="text-xs font-medium leading-[150%] text-[#8E8E8E]">활동 및 소식</div>
          <button
            className="flex w-full items-center justify-between mt-2"
            onClick={() => navigate('/my/bookmark')}
          >
            <div className="flex items-center">
              <Icon name="bookmark" width={18} height={18} className="mr-2" />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">
                나의 북마크
              </div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
          <button
            className="flex w-full items-center justify-between mt-3"
            onClick={() => navigate('/my/notice')}
          >
            <div className="flex items-center">
              <Icon name="announcement" width={18} height={18} className="mr-2" />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">공지사항</div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
        </div>

        <div className="flex flex-col items-start self-stretch rounded-xl bg-gray-50 p-4 mb-4">
          <span className="text-xs font-medium leading-[150%] text-[#8E8E8E] mb-2">설정</span>
          <button
            className="flex w-full items-center justify-between"
            onClick={() => navigate('/my/user-info')}
          >
            <div className="flex items-center">
              <Icon name="edit" width={18} height={18} />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">
                회원 정보 설정
              </div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
          <button
            className="flex w-full items-center justify-between mt-2"
            onClick={() => navigate('/my/account-settings')}
          >
            <div className="flex items-center ">
              <Icon name="settings" width={18} height={18} className="mr-2" />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">계정 설정</div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
          <button
            className="flex w-full items-center justify-between mt-3"
            onClick={() => navigate('/my/alarm')}
          >
            <div className="flex items-center">
              <Icon name="bell" width={18} height={18} className="mr-2" />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">알림 설정</div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
        </div>

        <div className="flex flex-col items-start self-stretch rounded-xl bg-gray-50 p-4">
          <span className="text-xs font-medium leading-[150%] text-[#8E8E8E]">고객지원</span>
          <button className="flex w-full items-center justify-between mt-3">
            <div className="flex items-center">
              <Icon name="annotation-dots" width={18} height={18} className="mr-2" />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">
                의견 남기기
              </div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
          <button
            className="flex w-full items-center justify-between mt-3"
            onClick={() => navigate('/my/policy')}
          >
            <div className="flex items-center">
              <Icon name="alert-circle" width={18} height={18} className="mr-2" />
              <div className="text-[18px] font-medium leading-[150%] text-[#2D2D2D]">
                약관 및 정책
              </div>
            </div>
            <span>
              <Icon name="chevron-right" width={18} height={18} />
            </span>
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-[52px] px-9 flex justify-between bg-white z-40">
        <Icon
          name="home"
          width={48}
          height={48}
          alt="홈"
          onClick={() => navigate('/home')}
          className="cursor-pointer"
        />
        <Icon name="mypage" width={48} height={48} className="cursor-pointer" alt="마이페이지" />
      </div>
    </div>
  );
};
