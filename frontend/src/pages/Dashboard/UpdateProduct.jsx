import { useContext, useEffect, useState } from 'react';
import Form from '../../components/Form';
import { API_CLIENT } from '../../utils/api';
import { GET_CATEGORY, UPDATE_PRODUCT } from '../../utils/constant';
import { ProductContext } from './Dashboard';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { AuthContext } from '../../App';

const UpdateProduct = ({ product }) => {
  const { setAuth } = useContext(AuthContext);
  const { setView, dispatch } = useContext(ProductContext);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    API_CLIENT.get(GET_CATEGORY)
      .then((res) => setCategory(res.data))
      .catch((err) => {
        if (err?.response?.status == '401') {
          setAuth(false);
        } else if (err.request) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  }, []);
  const options = () =>
    category.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ));
  const onSubmit = (formData) => {
    setView(
      <Loading
        action="Updating"
        bgColor="bg-[#00000080]"
        textColor="text-white"
        full={true}
      />
    );
    API_CLIENT.put(UPDATE_PRODUCT + '/' + product._id, formData)
      .then((res) => {
        dispatch({
          type: 'updated_product',
          data: res.data.modifiedProduct,
          categoryDeleted: res.data.flag,
        });
        toast.success('Product Updated Successfully.', { toastId: 14 });
        setView(null);
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          setAuth(false);
        } else if (err.request) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  };
  return category ? (
    <Form
      submitForm={onSubmit}
      options={options()}
      initialData={product}
      mode="edit"
    />
  ) : (
    <Loading bgColor="bg-[#00000080]" textColor="text-white" full={true} />
  );
};

UpdateProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default UpdateProduct;
