import { useContext, useEffect, useState } from 'react';
import Form from '../../components/Form';
import { API_CLIENT } from '../../utils/api';
import { ADD_PRODUCT, GET_CATEGORY } from '../../utils/constant';
import { ProductContext } from './Dashboard';
import Loading from '../../components/Loading';

const AddProduct = () => {
  const { setView, dispatch } = useContext(ProductContext);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    API_CLIENT.get(GET_CATEGORY).then((res) => setCategory(res.data));
  }, []);
  const options = () =>
    category.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ));
  const onSubmit = (formData) => {
    setView(<Loading action="Creating" bgColor="bg-[#00000080]" />);
    API_CLIENT.post(ADD_PRODUCT, formData)
      .then((res) => {
        dispatch({
          type: 'added_product',
          payload: res.data,
        });
        setView(null);
      })
      .catch((err) => console.log(err));
  };
  return category && <Form submitForm={onSubmit} options={options()} />;
};

export default AddProduct;
