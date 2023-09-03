import { useContext, useEffect, useState } from 'react';
import Form from '../../components/Form';
import { API_CLIENT } from '../../utils/api';
import { ADD_PRODUCT, GET_CATEGORY } from '../../utils/constant';
import { ProductContext } from './Dashboard';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { AuthContext } from '../../App';

const AddProduct = () => {
  const { setUser } = useContext(AuthContext);
  const { setView, dispatch } = useContext(ProductContext);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    API_CLIENT.get(GET_CATEGORY)
      .then((res) => setCategory(res.data))
      .catch((err) => {
        if (err?.response?.status == '401') {
          setUser({ auth: false, name: '' });
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
        action="Creating"
        bgColor="bg-[#00000080]"
        textColor="text-white"
        full={true}
      />
    );
    API_CLIENT.post(ADD_PRODUCT, formData)
      .then((res) => {
        dispatch({
          type: 'added_product',
          payload: res.data,
        });
        toast.success('Product Created Successfully.', { toastId: 12 });
        setView(null);
      })
      .catch((err) => {
        if (err?.response?.status == '401') {
          setUser({ auth: false, name: '' });
        } else if (err.request) {
          toast.error('Server Error', { toastId: 123 });
        }
      });
  };
  return category ? (
    <Form submitForm={onSubmit} options={options()} />
  ) : (
    <Loading bgColor="bg-[#00000080]" textColor="text-white" full={true} />
  );
};

export default AddProduct;
