import image from '../../assets/images/Inventory.png';
import { NavLink } from 'react-router-dom';
import Footer from './footer';

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
          <button className="hidden md:block text-xl border border-black rounded-2xl p-2 bg-green-300 md:text-2xl md:hover:scale-110 md:hover:bg-green-400 transition-all">
            <NavLink to={'/dashboard'}>Get Started</NavLink>
          </button>
        </div>
        <div className="flex justify-center w-80 md:w-[32rem]">
          <img src={image} alt=" " className="" />
        </div>
        <button className="md:hidden mt-12 text-xl border border-black rounded-2xl p-2 bg-green-300">
          <NavLink to={'/dashboard'}>Get Started</NavLink>
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Home;
