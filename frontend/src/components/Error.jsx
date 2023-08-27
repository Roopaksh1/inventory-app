import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10">
      <div className="flex gap-2 items-center text-xl font-poppins">
        <div>404</div>
        <span className="text-4xl">|</span>
        <h1>Page Not Found</h1>
      </div>
      <button className="cursor-pointer lg:hover:scale-110">
        <Link className="text-2xl" to={'/'}>
          <i className="fa-solid fa-arrow-left text-xl align-baseline"></i> Back
        </Link>
      </button>
    </div>
  );
};

export default Error;
