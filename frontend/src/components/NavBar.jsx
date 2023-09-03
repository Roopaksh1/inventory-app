import { useContext, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../App';
import { API_CLIENT } from '../utils/api';
import { LOG_OUT } from '../utils/constant';
import { toast } from 'react-toastify';
import { capitalize } from '../utils/capitalize';

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navdom = useRef();
  const toggle = () => {
    navdom.current.classList.toggle('translate-x-full');
    Array.from(navdom.current.children).forEach(
      (d) => (d.tabIndex = d.tabIndex == -1 ? 0 : -1)
    );
  };
  const handleLogout = () => {
    API_CLIENT.get(LOG_OUT)
      .then((res) => {
        toast.success(res.data);
        setUser({ auth: false, name: '' });
      })
      .catch((err) => {
        if (!err.response) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  };

  return (
    <div className="overflow-hidden flex flex-col min-h-screen">
      <header className="p-4 font-bold font-serif text-3xl flex justify-between border-b-4 border-gray-300 sm:text-4xl">
        <div className="flex flex-col items-start">
          <span className="text-2xl">
            {!user.auth ? 'InStock' : `Welcome ${capitalize(user.name)}`}
          </span>
          {user.auth ? (
            <button
              onClick={handleLogout}
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log out
            </button>
          ) : null}
        </div>
        <i className="fa-solid fa-bars sm:hidden" onClick={toggle}></i>
        <nav className="hidden text-lg sm:flex gap-6 items-center">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'border-b-2 border-red-400 scale-110' : ''
            }
          >
            Home
          </NavLink>
          <NavLink
            to={'/category'}
            className={({ isActive }) =>
              isActive ? 'border-b-2 border-red-400 scale-110' : ''
            }
          >
            Categories
          </NavLink>
          <NavLink
            to={'/dashboard'}
            className={({ isActive }) =>
              isActive ? 'border-b-2 border-red-400 scale-110' : ''
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={'/contact'}
            className={({ isActive }) =>
              isActive ? 'border-b-2 border-red-400 scale-110' : ''
            }
          >
            Contact
          </NavLink>
        </nav>
      </header>
      <nav
        className="flex font-semibold font-sans justify-between navbar translate-x-full transition-transform px-4 border-b-4 border-gray-300 sm:hidden"
        ref={navdom}
      >
        <div className="flex flex-col gap-2">
          <NavLink to={'/'} onClick={toggle} tabIndex={-1}>
            Home
          </NavLink>
          <NavLink to={'/dashboard'} onClick={toggle} tabIndex={-1}>
            Dashboard
          </NavLink>
          <NavLink to={'/contact'} onClick={toggle} tabIndex={-1}>
            Contact
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <NavLink to={'/category'} onClick={toggle} tabIndex={-1}>
            Categories
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
