import { useAuth } from 'auth/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { signout } = useAuth();

  return (
    <nav
      role='navigation'
      className='bg-blue-400 fixed top-0 flex justify-between w-screen py-4 px-9'
    >
      <div>
        <Link to='/' className='navlink'>
          Home
        </Link>
        <Link to='/orders' className='navlink'>
          Orders
        </Link>
      </div>
      <div className='navlink hover:cursor-pointer' onClick={signout}>
        Sign Out
      </div>
    </nav>
  );
};

export default Navbar;
