import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <Link to={'/'}>홈</Link>
      <Link to={'/login'}>로그인</Link>
    </>
  );
};

export default Nav;
