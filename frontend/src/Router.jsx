import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/dashboard';
import Contact from './pages/Contact/Contact';
import Error from './components/Error';
import Category from './pages/Category/category';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      children: [
        { index: true, element: <Home /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'contact', element: <Contact /> },
        { path: 'category', element: <Category /> },
      ],
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
