import { useEffect, useState } from 'react';
import Form from '../../components/Form';
import { API_CLIENT } from '../../utils/api';
import { GET_CATEGORY } from '../../utils/constant';

const AddProduct = () => {
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
  const onSubmit = () => {};
  return category && <Form submitForm={onSubmit} options={options()} />;
};

export default AddProduct;
