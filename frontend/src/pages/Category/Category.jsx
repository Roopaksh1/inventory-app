import { useEffect, useReducer } from 'react';
import { API_CLIENT } from '../../utils/api';
import { GET_CATEGORY } from '../../utils/constant';
import {
  categoryReducer,
  initialCategoryState,
} from '../../reducer/categoryReducer';
import Loading from '../../components/Loading';
import Product from './Product';
import { capitalize } from '../../utils/capitalize';
import image from '../../assets/images/category-tag.png';

const Category = () => {
  const [state, dispatch] = useReducer(categoryReducer, initialCategoryState);
  useEffect(() => {
    const loadCategory = () => {
      API_CLIENT.get(GET_CATEGORY)
        .then((res) => dispatch({ type: 'data_fetched', payload: res.data }))
        .catch((err) => console.log(err))
        .finally(dispatch({ type: 'loaded' }));
    };
    loadCategory();
  }, []);

  const handleSelect = (e) => {
    API_CLIENT.get(GET_CATEGORY + '/' + e.target.getAttribute('data-id'))
      .then((res) =>
        dispatch({
          type: 'selected',
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };

  const mapCategory = () => {
    return state.category.map((c) => (
      <div
        key={c._id}
        className="flex flex-col items-center text-start gap-2 border-2 p-2 lg:hover:shadow-lg hover:shadow-sm"
      >
        <img src={image} alt=" " />
        <h5 className="overflow-hidden max-w-full font-bold md:text-xl ">
          {capitalize(c.name)}
        </h5>
        <p className="text-sm md:text-base overflow-auto max-h-[6rem] md:max-h-[10rem] max-w-full p-1">
          {c.description}
        </p>
        <button
          className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
          onClick={handleSelect}
          data-id={c._id}
        >
          Check
        </button>
      </div>
    ));
  };

  return state.loading || !state.category ? (
    <Loading />
  ) : !state.product ? (
    <main className="category p-6 overflow-auto">{mapCategory()}</main>
  ) : (
    <Product product={state.product} dispatch={dispatch} />
  );
};

export default Category;
