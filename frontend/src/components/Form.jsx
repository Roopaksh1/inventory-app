import { useContext, useRef, useState } from 'react';
import { ProductContext } from '../pages/Dashboard/Dashboard';
import { toast } from 'react-toastify';

const Form = ({
  submitForm,
  options,
  initialData = {
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: '',
    description: '',
  },
  mode = '',
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name,
    category: initialData.category._id,
    price: initialData.price,
    quantity: initialData.quantity,
    image: initialData.image.url,
    description: initialData.description,
  });
  const form = useRef();
  const name = useRef();
  const category = useRef();
  const price = useRef();
  const quantity = useRef();
  const image = useRef();
  const description = useRef();
  const { setView } = useContext(ProductContext);
  const closeView = () => {
    setView(null);
  };
  const handleInput = () => {
    setFormData((prevState) => {
      return {
        ...prevState,
        name: name.current.value,
        category: category.current.value,
        price: price.current.value,
        quantity: quantity.current.value,
        description: description.current.value,
        image: image.current.files[0],
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.name === '') {
      toast.error('Please enter product name!', { toastId: 2 });
      return;
    } else if (formData.category === '') {
      toast.error('Choose a category!', { toastId: 3 });
      return;
    } else if (formData.price === '') {
      toast.error('Please enter product price!', { toastId: 4 });
      return;
    } else if (formData.quantity === '') {
      toast.error('Please enter quantity!', { toastId: 5 });
      return;
    } else if (mode !== 'edit' && !formData.image) {
      toast.error('Please upload an image!', {
        toastId: 6,
      });
      return;
    } else if (formData.description === '') {
      toast.error('Please enter product description!', { toastId: 7 });
      return;
    } else if (formData.description.length > 255) {
      toast.error('Description can have no more than 255 words!', {
        toastId: 8,
      });
      return;
    }
    const data = new FormData(form.current);
    submitForm(data);
  };

  let imagePreview;
  try {
    imagePreview = <img src={URL.createObjectURL(formData.image)} alt=" " />;
  } catch (err) {
    imagePreview = <img src={formData.image} alt=" " />;
  }
  return (
    <div className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-[#00000080] flex justify-center items-center">
      <div className="overflow-auto h-[95vh] w-80 md:w-[30rem]">
        <form
          className="p-4 bg-white rounded-lg flex flex-col gap-2 justify-stretch"
          onSubmit={onSubmit}
          encType="multipart/form-data"
          ref={form}
        >
          <p className="text-end text-red-600">
            <button type="button" onClick={closeView}>
              <i className="fa-solid fa-xmark"></i>
            </button>
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
              placeholder="GeForce RTX 4090"
              autoFocus
              ref={name}
              value={formData.name}
              onInput={handleInput}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={category}
              value={formData.category}
              onInput={handleInput}
            >
              <option value="">Choose a Category</option>
              {options}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price <span className="font-normal">(In Rupees)</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min={0}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="&#8377; 158000"
              ref={price}
              value={formData.price}
              onInput={handleInput}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={0}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              ref={quantity}
              value={formData.quantity}
              onInput={handleInput}
            />
          </div>
          <p>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="image"
            >
              Upload Image <br />
              <span className="font-normal">Valid Format : png, jpeg, jpg</span>
            </label>
            <input
              className="p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="image"
              name="image"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={image}
              onInput={handleInput}
            />
          </p>
          {imagePreview}
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
              placeholder="Tell us about the product"
              ref={description}
              value={formData.description}
              onInput={handleInput}
            ></textarea>
            <div className="text-end text-sm px-2">
              {formData.description.length}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
