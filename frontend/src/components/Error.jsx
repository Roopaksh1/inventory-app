import { Link } from 'react-router-dom';
import Button from './Button';

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10">
      <div className="flex gap-2 items-center text-xl font-poppins">
        <div>404</div>
        <span className="text-4xl">|</span>
        <h1>Page Not Found</h1>
      </div>
      <Button
        color={'white'}
        style={'lg:hover:scale-110 text-black !p-0 w-auto'}
      >
        <Link className="text-2xl" to={'/'}>
          <i className="fa-solid fa-arrow-left text-xl align-baseline"></i> Back
        </Link>
      </Button>
    </div>
  );
};

export default Error;
