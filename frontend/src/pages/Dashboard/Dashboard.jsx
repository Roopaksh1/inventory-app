import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ProductTable from './productTable';

const products = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Category 1',
    price: 'Price 1',
    quantity: '1',
    value: '1',
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    price: 'Price 2',
    quantity: '1',
    value: '1',
  },
  {
    id: 3,
    name: 'Product 3',
    category: 'Category 3',
    price: 'Price 3',
    quantity: '1',
    value: '1',
  },
  {
    id: 4,
    name: 'MSI GeForce RTX 4080 16GB Graphics Card',
    category: 'asdfghjklamsndt',
    price: 'Price 4',
    quantity: '1',
    value: '1',
  },
  {
    id: 5,
    name: 'Product 5',
    category: 'Category 5',
    price: 'Price 5',
    quantity: '1',
    value: '1',
  },
  {
    id: 6,
    name: 'Product 6',
    category: 'Category 6',
    price: 'Price 6',
    quantity: '1',
    value: '1',
  },
];

const Dashboard = ({
  totalProducts = 0,
  totalPrice = 0,
  outOfStock = 0,
  totalCategory = 0,
}) => {
  const [productName, setProductName] = useState('');

  return (
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
  );
};

export default Dashboard;
