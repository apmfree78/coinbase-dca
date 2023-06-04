import 'styles/Navbar.css';

import { useAuth } from 'auth/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { signout } = useAuth();

  return (
    <nav
      role='navigation'
      className='bg-blue-400 fixed top-0 flex justify-between'
    >
      <div>
        <Link
          to='/'
          className='text-lg text-white font-bold pr-4 hover:underline'
        >
          Home
        </Link>
        <Link
          to='/posts'
          className='text-lg text-white font-bold pr-4 hover:underline'
        >
          Orders
        </Link>
      </div>
      <div
        className='text-lg text-white font-bold pr-4 hover:underline hover:cursor-pointer'
        onClick={signout}
      >
        Sign Out
      </div>
    </nav>
  );
};

export default Navbar;
