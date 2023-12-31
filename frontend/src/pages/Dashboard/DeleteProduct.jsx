import { useContext, useRef } from 'react';
import { ProductContext } from './Dashboard';
import { API_CLIENT } from '../../utils/api';
import { DELETE_PRODUCT } from '../../utils/constant';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { AuthContext } from '../../App';

const DeleteProduct = ({ product }) => {
  const { setUser } = useContext(AuthContext);
  const { setView, dispatch } = useContext(ProductContext);
  const view = useRef();
  const handleClick = (e) => {
    if (!view.current.contains(e.target)) {
      closeView();
    }
  };
  const closeView = () => {
    setView(null);
  };

  const deleteProduct = () => {
    setView(
      <Loading
        action="Deleting"
        bgColor="bg-[#00000080]"
        textColor="text-white"
        full={true}
      />
    );
    API_CLIENT.delete(DELETE_PRODUCT + '/' + product._id)
      .then((res) => {
        dispatch({
          type: 'deleted_product',
          data: res.data.products,
          length: res.data.totalCategory,
        });
        toast.success('Product Deleted Successfully.', { toastId: 13 });
        closeView();
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          setUser({ auth: false, name: '' });
        } else if (err.request) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  };

  return (
    <div
      className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-[#00000080] flex justify-center items-center"
      onMouseDown={handleClick}
    >
      <div
        className="max-w-[20rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        ref={view}
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Delete Product
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
          Are you sure you want to delete {product.name}.
        </p>
        <div className="flex justify-between">
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={deleteProduct}
          >
            Delete
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={closeView}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default DeleteProduct;
