import { createContext, useEffect, useState } from 'react';
import Router from './Router';
import { API_CLIENT } from './utils/api';
import { GET_AUTH_STATUS } from './utils/constant';
import { ToastContainer, toast } from 'react-toastify';

export const AuthContext = createContext({
  user: {
    auth: false,
    name: '',
  },
  setUser: () => {},
});

const App = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    API_CLIENT.get(GET_AUTH_STATUS)
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err?.response?.status == '401') {
          setUser({ auth: false, name: '' });
        } else if (err.request) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
