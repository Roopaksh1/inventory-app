import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/dashboard';
import Contact from './pages/Contact/Contact';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      children: [
        { index: true, element: <Home /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'contact', element: <Contact /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
