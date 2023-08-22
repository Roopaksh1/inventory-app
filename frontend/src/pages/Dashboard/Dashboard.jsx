import { createContext, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ProductTable from './productTable';

const products = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Category 1',
    price: 105.57,
    quantity: 2,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi deserunt quam, quasi harum atque omnis, nemo, beatae similique enim aspernatur accusamus. Ducimus, impedit! Tenetur, aut. Quia inventore voluptatibus incidunt.',
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    price: 105.58,
    quantity: 0,
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    name: 'Product 3',
    category: 'Category 3',
    price: 42,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    name: 'MSI GeForce RTX 4080 16GB Graphics Card',
    category: 'asdfghjklamsndt',
    price: 32,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 5,
    name: 'Product 5',
    category: 'Category 5',
    price: 22,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 6,
    name: 'Product 6',
    category: 'Category 6',
    price: 2,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
];

export const ProductContext = createContext({
  setProductView: () => {},
});

const Dashboard = ({
  totalProducts = 0,
  totalPrice = 0,
  outOfStock = 0,
  totalCategory = 0,
}) => {
  const [productName, setProductName] = useState('');
  const [productView, setProductView] = useState(null);

  return (
    <ProductContext.Provider value={{ setProductView }}>
      <main className="flex-grow p-4 flex flex-col items-center gap-4 sm:w-[80%] sm:self-center">
        <div className="text-lg sm:text-base md:text-lg flex flex-col gap-4 sm:flex-row sm:self-stretch">
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-cart-shopping text-2xl"></i>
            <p className="flex-grow">
              Total Products
              <br />
              {totalProducts}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-sack-dollar text-2xl"></i>
            <p className="flex-grow">
              Total Price
              <br />
              {totalPrice}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-red-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-shop-slash text-2xl"></i>
            <p className="flex-grow">
              Out Of Stock
              <br />
              {outOfStock}
            </p>
          </div>
          <div className="flex gap-2 text-center bg-green-400 rounded-xl p-2 sm:flex-grow sm:basis-0">
            <i className="fa-solid fa-bars-staggered text-2xl"></i>
            <p className="flex-grow">
              Total Categories
              <br />
              {totalCategory}
            </p>
          </div>
        </div>
        <SearchBar search={productName} setSearch={setProductName} />
        <ProductTable products={products} query={productName} />
      </main>
      {productView}
    </ProductContext.Provider>
  );
};

export default Dashboard;
