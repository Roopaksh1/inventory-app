import { useContext, useRef } from 'react';
import { ProductContext } from './Dashboard';
import { API_CLIENT } from '../../utils/api';
import { DELETE_PRODUCT } from '../../utils/constant';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Button from '../../components/Button';

const DeleteProduct = ({ product }) => {
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
      .catch((err) => console.log(err));
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
          <Button action={deleteProduct} color={'red'} style={'w-auto'}>
            Delete
          </Button>
          <Button action={closeView} style={'w-auto'}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

DeleteProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default DeleteProduct;
