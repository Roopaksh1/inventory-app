import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import SearchBar from '../../components/SearchBar';
import ProductTable from './ProductTable';
import {
  initialProductState,
  productReducer,
} from '../../reducer/productReducer';
import { GET_PRODUCT } from '../../utils/constant';
import { API_CLIENT } from '../../utils/api';
import Loading from '../../components/Loading';
import AddProduct from './AddProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCategory from './AddCategory';
import EmptyBox from '../../components/EmptyBox';
import { AuthContext } from '../../App';
import { Navigate } from 'react-router-dom';

export const ProductContext = createContext({
  setView: () => {},
  dispatch: () => {},
});

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [productName, setProductName] = useState('');
  const [view, setView] = useState(null);
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  useEffect(() => {
    const loadProducts = () => {
      API_CLIENT.get(GET_PRODUCT)
        .then((res) =>
          dispatch({
            type: 'data_fetched',
            data: res.data.products,
            length: res.data.totalCategory,
          })
        )
        .catch((err) => {
          if (err?.response?.status == '401') {
            setUser({ auth: false, name: '' });
          } else if (err.request) {
            toast.error('Server Error', { toastId: 123 });
          }
        })
        .finally(dispatch({ type: 'loaded' }));
    };
    loadProducts();
  }, []);

  const getOutOfStock = () => {
    let count = 0;
    for (let d of state.data) {
      if (d.quantity == 0) count++;
    }
    return count;
  };

  const getTotalValue = () => {
    let sum = 0;
    for (let d of state.data) {
      sum += d.price * d.quantity;
    }
    return sum;
  };

  return !user.auth ? (
    <Navigate to={'/login'} />
  ) : state.loading || !state.data ? (
    <Loading />
  ) : (
    <ProductContext.Provider value={{ setView, dispatch }}>
      <main className="flex-grow p-4 flex flex-col items-center gap-4 sm:self-center">
        <div className="text-lg sm:text-base md:text-lg flex flex-col gap-4 sm:flex-row sm:self-stretch">
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-cart-shopping text-2xl"></i>
            <p className="flex-grow">
              Total Products
              <br />
              {state.data.length}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-sack-dollar text-2xl"></i>
            <p className="flex-grow">
              Total Price
              <br />
              &#8377;{getTotalValue()}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-red-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-shop-slash text-2xl"></i>
            <p className="flex-grow">
              Out Of Stock
              <br />
              {getOutOfStock()}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-bars-staggered text-2xl"></i>
            <p className="flex-grow">
              Total Categories
              <br />
              {state.totalCategory}
            </p>
          </div>
        </div>
        <SearchBar search={productName} setSearch={setProductName} />
        {state.data.length ? (
          <ProductTable products={state.data} query={productName} />
        ) : (
          <EmptyBox
            text={'No Products Found'}
            style={'w-[80vw] text-3xl font-sans text-center my-10'}
          />
        )}
        <div>
          <button
            className="mr-5 md:text-xl inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setView(<AddCategory />);
            }}
          >
            Add Category
          </button>
          <button
            className="md:text-xl inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              if (state.totalCategory !== 0) {
                setView(<AddProduct />);
              } else {
                toast.warning('Add a category first!', { toastId: 1 });
              }
            }}
          >
            Add Product
          </button>
        </div>
      </main>
      {view}
    </ProductContext.Provider>
  );
};

export default Dashboard;
