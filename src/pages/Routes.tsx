import { createBrowserRouter, Navigate, RouterProvider, RouteObject } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';
import { EmptyLayout } from './Layouts/EmptyLayout';
import { OnBoardPage } from './OnBoardPage';
import { MyPage } from './MyPage';
import { OauthCallbackPage } from './OnBoardPage/OauthCallbackPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Bookmark from './MyPage/pages/Bookmark';
import FindIdPage from './FindIdPage';
import FindIdSuccess from './FindIdPage/pages/FindIdSuccess';
import ResetPasswordPage from './ResetPasswordPage';
import { AgreedToTerms } from './SignupPage/pages/AgreedToTerms';
import { AgreedToPrivacy } from './SignupPage/pages/AgreedToPrivacy';
import NoticeBoard from './MyPage/pages/NoticeBoard';
import NoticeBoardDetails from './MyPage/pages/NoticeBoardDetails';
import UserInfoSettings from './MyPage/pages/UserInfoSettings';
import AlramSettings from './MyPage/pages/AlramSettings';
import NewPassword from './ResetPasswordPage/pages/NewPassword';
import ResetSuccess from './ResetPasswordPage/pages/ResetSuccess';
import Policy from './MyPage/pages/Policy';
import { HomeLayout } from './Layouts/HomeLayout';
import { RouterGuardProvider } from './RouterGuardProvider';
import { guards } from './router-guard';
import { WeatherDetail } from './HomePage/pages/WeatherDetail';
import { AccountInfoSettings } from './MyPage/pages/AccountInfoSettings';
import { AgreedToLocation } from './SignupPage/pages/AgreedToLocation';
import { HomewithHeaderLayout } from './Layouts/HomewithHeaderLayout';

type RouteWithHandle = RouteObject & {
  handle?: {
    title: string;
    isShowBack?: boolean;
    isShowForward?: boolean;
  };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterGuardProvider guards={guards} />,
    children: [
      { path: '', element: <Navigate to="/login" replace={true} /> } as RouteWithHandle,
      {
        path: '/home',
        element: <HomeLayout />,
        children: [{ path: '', element: <HomePage /> }],
      } as RouteWithHandle,
      {
        path: '/weather',
        element: <HomewithHeaderLayout />,
        children: [
          {
            path: '',
            element: <WeatherDetail />,
            handle: {
              isShowBack: true,
            },
          },
        ],
      } as RouteWithHandle,
      {
        path: '/login',
        element: <EmptyLayout />,
        children: [
          {
            path: '',
            element: <OnBoardPage />,
          },
          { path: 'oauth-callback', element: <OauthCallbackPage /> },
        ],
      } as RouteWithHandle,
      {
        path: '/login/form',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <LoginPage />,
            handle: {
              isShowBack: true,
            },
          },
        ],
      } as RouteWithHandle,
      {
        path: '/signup',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <SignupPage />,
            handle: {
              isShowBack: true,
            },
          },
          {
            path: 'agreedToTerms',
            element: <AgreedToTerms />,
            handle: {
              isShowBack: true,
              title: '이용약관',
            },
          },
          {
            path: 'agreedToPrivacy',
            element: <AgreedToPrivacy />,
            handle: {
              isShowBack: true,
              title: '개인정보처리방침',
            },
          },
          {
            path: 'agreedToLocation',
            element: <AgreedToLocation />,
            handle: {
              isShowBack: true,
              title: '위치기반서비스',
            },
          },
        ],
      } as RouteWithHandle,
      {
        path: '/find-id',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <FindIdPage />,
            handle: {
              isShowBack: true,
              title: '아이디 찾기',
            },
          },
          {
            path: 'success',
            element: <FindIdSuccess />,
            handle: {
              isShowBack: true,
              title: '아이디 찾기',
            },
          },
        ],
      } as RouteWithHandle,
      {
        path: '/reset-password',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <ResetPasswordPage />,
            handle: {
              isShowBack: true,
              title: '비밀번호 찾기',
            },
          },
          {
            path: 'newpassword',
            element: <NewPassword />,
            handle: {
              isShowBack: true,
              title: '비밀번호 찾기',
            },
          },
          {
            path: 'success',
            element: <ResetSuccess />,
            handle: {
              isShowBack: true,
            },
          },
        ],
      } as RouteWithHandle,
      {
        path: '/my',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <MyPage />,
            handle: {
              title: '마이페이지',
            },
          } as RouteWithHandle,
          {
            path: 'bookmark',
            element: <Bookmark />,
            handle: {
              title: '북마크',
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'notice',
            element: <NoticeBoard />,
            handle: {
              title: '공지사항',
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'notice/:id',
            element: <NoticeBoardDetails />,
            handle: {
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'user-info',
            element: <UserInfoSettings />,
            handle: {
              title: '회원 정보 설정',
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'alarm',
            element: <AlramSettings />,
            handle: {
              title: '알림 설정',
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'account-settings',
            element: <AccountInfoSettings />,
            handle: {
              title: '계정 설정',
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'policy',
            element: <Policy />,
            handle: {
              title: '약관 및 정책',
              isShowBack: true,
            },
          } as RouteWithHandle,
          {
            path: 'password',
            element: <Policy />,
            handle: {
              title: '약관 및 정책',
              isShowBack: true,
            },
          } as RouteWithHandle,
        ],
      },
      {
        path: '*',
        element: <Navigate to="/login" replace={true} />,
      } as RouteWithHandle,
    ],
  },
] as RouteWithHandle[]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
