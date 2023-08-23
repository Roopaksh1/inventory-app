import { createContext, useEffect, useReducer, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ProductTable from './productTable';
import { initialState, productReducer } from '../../reducer/productReducer';
import axios from 'axios';
import { GET_PRODUCT } from '../../data/constant';

export const ProductContext = createContext({
  setView: () => {},
});

const Dashboard = ({
  totalProducts = 0,
  totalPrice = 0,
  outOfStock = 0,
  totalCategory = 0,
}) => {
  const [productName, setProductName] = useState('');
  const [View, setView] = useState(null);
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    axios
      .get(GET_PRODUCT)
      .then((res) => dispatch({ type: 'data_fetched', payload: res.data }))
      .catch((err) => console.log(err))
      .finally(dispatch({ type: 'loaded' }));
  }, []);

  return (state.loading || !state.data) ? (
    <div className='flex-grow text-4xl w-full flex flex-col gap-4 justify-center items-center sm:text-5xl'>
      <i className="fa-solid fa-circle-notch animate-spin"></i>
      <p>Loading</p>
    </div>
  ) : (
    <ProductContext.Provider value={{ setView }}>
      <main className="flex-grow p-4 flex flex-col items-center gap-4 sm:w-[80%] sm:self-center">
        <div className="text-lg sm:text-base md:text-lg flex flex-col gap-4 sm:flex-row sm:self-stretch">
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-cart-shopping text-2xl"></i>
            <p className="flex-grow">
              Total Products
              <br />
              {totalProducts}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-sack-dollar text-2xl"></i>
            <p className="flex-grow">
              Total Price
              <br />
              {totalPrice}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-red-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-shop-slash text-2xl"></i>
            <p className="flex-grow">
              Out Of Stock
              <br />
              {outOfStock}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-bars-staggered text-2xl"></i>
            <p className="flex-grow">
              Total Categories
              <br />
              {totalCategory}
            </p>
          </div>
        </div>
        <SearchBar search={productName} setSearch={setProductName} />
        <ProductTable products={state.data.products} query={productName} />
      </main>
      {View}
    </ProductContext.Provider>
  );
};

export default Dashboard;
