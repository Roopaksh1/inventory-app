import { useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NavBar = () => {
  const navdom = useRef();
  const toggle = () => {
    navdom.current.classList.toggle('translate-x-full');
    Array.from(navdom.current.children).forEach(
      (d) => (d.tabIndex = d.tabIndex == -1 ? 0 : -1)
    );
  };

  return (
    <div className="overflow-hidden flex flex-col min-h-screen">
      <header className="p-4 font-bold font-serif text-3xl flex justify-between border-b-4 border-gray-300 sm:text-4xl">
        InStock
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
