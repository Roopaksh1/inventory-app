import { useContext, useRef, useState } from 'react';
import { ProductContext } from './Dashboard';
import { API_CLIENT } from '../../utils/api';
import { ADD_CATEGORY } from '../../utils/constant';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import Button from '../../components/Button';

const AddCategory = () => {
  const { setView, dispatch } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const name = useRef();
  const description = useRef();
  const handleInput = () => {
    setFormData({
      name: name.current.value,
      description: description.current.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === '') {
      toast.error('Please enter category name!', { toastId: 9 });
      return;
    } else if (formData.description === '') {
      toast.error('Please enter category description!', { toastId: 10 });
      return;
    } else if (formData.description.length > 255) {
      toast.error('Description can have no more than 255 words!', {
        toastId: 11,
      });
      return;
    }
    const data = {
      name: formData.name,
      description: formData.description,
    };
    setView(
      <Loading
        action="Creating"
        bgColor="bg-[#00000080]"
        textColor="text-white"
        full={true}
      />
    );
    API_CLIENT.post(ADD_CATEGORY, data).then(() => {
      dispatch({
        type: 'added_category',
      });
      toast.success('Category Created Successfully.', { toastId: 12 });
      setView(null);
    });
  };
  return (
    <div className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-[#00000080] flex justify-center items-center">
      <form
        className="p-4 bg-white rounded-lg flex flex-col gap-2 justify-stretch md:w-[30rem]"
        onSubmit={handleSubmit}
      >
        <p className="text-end text-red-600">
          <Button
            color={'white'}
            action={() => setView(null)}
            style={'text-end !p-0'}
          >
            <i className="fa-solid fa-xmark text-red-600"></i>
          </Button>
        </p>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Computer Hardware"
            autoFocus
            ref={name}
            value={formData.name}
            onInput={handleInput}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description{' '}
            <span className="font-normal text-[0.8rem]">
              (limit: 255 characters)
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Computer hardware includes the physical parts of a computer."
            ref={description}
            value={formData.description}
            onInput={handleInput}
          ></textarea>
          <div className="text-end text-sm px-2">
            {formData.description.length}
          </div>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default AddCategory;
