import { NavLink, Navigate } from 'react-router-dom';
import image from '../../../public/favicon.png';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../App';
import { API_CLIENT } from '../../utils/api';
import { POST_SIGN_UP } from '../../utils/constant';
import { toast } from 'react-toastify';

const SignUp = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const name = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const handleSignup = (e) => {
    e.preventDefault();
    if (name.current.value == '') {
      toast.error('Username required.', { toastId: 432 });
      return;
    }
    if (
      !password.current.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
      ) ||
      password.current.value.length < 8
    ) {
      toast.error('Invalid Password', { toastId: 5671 });
      return;
    }
    if (password.current.value != confirmPassword.current.value) {
      toast.error('Password not matching', { toastId: 1342 });
      return;
    }
    API_CLIENT.post(POST_SIGN_UP, {
      name: name.current.value,
      password: password.current.value,
    })
      .then((res) => {
        toast.success(res.data);
        setAuth(true);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return !auth ? (
    <section className="bg-gray-50 dark:bg-gray-900 flex-grow flex justify-center flex-col">
      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={image} alt="logo" />
          InStock
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  ref={name}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                  <br />
                  <span className="font-light text-xs">
                    Password must be at least 8 characters long and contain one
                    uppercase, one lowercase and a number. White spaces are not
                    allowed.
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  ref={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  ref={confirmPassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <NavLink
                  to={'/login'}
                  className="font-medium hover:underline dark:text-blue-500  text-indigo-600 hover:text-indigo-500"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to={'/'} />
  );
};

export default SignUp;
