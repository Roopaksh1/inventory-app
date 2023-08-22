import { useContext, useRef } from 'react';
import { ProductContext } from './dashboard';

const ProductView = ({ product }) => {
  console.log(product);
  const { setProductView } = useContext(ProductContext);
  const view = useRef();
  const handleClick = (e) => {
    if (!view.current.contains(e.target)) {
      closeView();
    }
  };
  const closeView = () => {
    setProductView(null);
  }
  return (
    <div
      className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-[#00000080] flex justify-center items-center"
      onMouseDown={handleClick}
    >
      <main className="flex flex-col bg-white p-10 gap-2 rounded-xl w-[70vw] h-[90vh] sm:w-[45vw] md:text-lg overflow-y-auto" ref={view}>
        <p className='text-end text-red-600'><button onClick={closeView}><i className="fa-solid fa-xmark"></i></button></p>
        <img className="w-[20rem] self-center mb-5" src={product.image} alt="Product" />
        <p className="font-bold">
          Product Availability:{' '}
          <span className=" font-normal">
            {product.quantity != 0 ? 'In Stock' : 'Out Of Stock'}
          </span>
        </p>
        <p className="font-bold">
          Product Name: <span className=" font-normal">{product.name}</span>
        </p>
        <p className="font-bold">
          Category: <span className=" font-normal">{product.category}</span>
        </p>
        <p className="font-bold">
          Price: <span className=" font-normal">{product.price}</span>
        </p>
        <p className="font-bold">
          Quantity: <span className=" font-normal">{product.quantity}</span>
        </p>
        <p className="font-bold">
          Value:{' '}
          <span className=" font-normal">
            {product.price * product.quantity}
          </span>
        </p>
        <p className="font-bold">
          Description:{' '}
          <span className=" font-normal">{product.description}</span>
        </p>
      </main>
    </div>
  );
};

export default ProductView;
