import { createContext, useEffect, useState } from 'react';
import Router from './Router';
import { API_CLIENT } from './utils/api';
import { GET_AUTH_STATUS } from './utils/constant';
import { ToastContainer, toast } from 'react-toastify';

export const AuthContext = createContext({
  isAuth: false,
});

const App = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    API_CLIENT.get(GET_AUTH_STATUS)
      .then((res) => setAuth(res.data))
      .catch((err) => {
        if (err?.response?.status == '401') {
          setAuth(false);
        } else if (err.request) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnFocusLoss={false}
      />
    </AuthContext.Provider>
  );
};

export default App;
