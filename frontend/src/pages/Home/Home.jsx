import image from '../../assets/images/Inventory.png';
import { NavLink } from 'react-router-dom';
import Footer from './footer';
import Button from '../../components/Button';

const Home = () => {
  return (
    <>
      <main className="p-4 flex flex-col justify-center items-center md:flex-row md:justify-center md:gap-20 flex-grow">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl md:mb-4">
            InStock
          </h1>
          <p className="mb-12 font-semibold sm:text-base md:text-xl">
            Inventory Management Made Easy
          </p>
          <Button
            color="green"
            style={'hidden md:block text-xl hover:scale-110 transition-all'}
          >
            <NavLink to={'/dashboard'}>Get Started</NavLink>
          </Button>
        </div>
        <div className="flex justify-center w-80 md:w-[32rem]">
          <img src={image} alt=" " className="" />
        </div>
        <Button color="green" style="md:hidden mt-8 sm:mt-12 text-xl w-auto">
          <NavLink to={'/dashboard'}>Get Started</NavLink>
        </Button>
      </main>
      <Footer />
    </>
  );
};

export default Home;
