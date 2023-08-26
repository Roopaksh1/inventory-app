import { useContext } from 'react';
import { ProductContext } from './Dashboard';
import ProductView from './ProductView';
import DeleteProduct from './DeleteProduct';
import { capitalize } from '../../utils/capitalize';
import UpdateProduct from './UpdateProduct';

const Product = ({ products, limit, search }) => {
  const { setView } = useContext(ProductContext);
  const showProductView = (e) => {
    const product = products.find(
      (p) => p._id == e.target.getAttribute('data-id')
    );
    setView(<ProductView product={product} />);
  };
  const showDeleteView = (e) => {
    const product = products.find(
      (p) => p._id == e.target.getAttribute('data-id')
    );
    setView(<DeleteProduct product={product} />);
  };
  const showEditForm = (e) => {
    const product = products.find(
      (p) => p._id == e.target.getAttribute('data-id')
    );
    setView(<UpdateProduct product={product} />);
  };
  const getProducts = () => {
    if (products.length === 0) return null;
    const allProducts = products.map((p) => {
      let flag = true;
      if (search.trimStart() != '') {
        if (!p.name.match(new RegExp(search, 'i'))) {
          flag = false;
        }
      }
      return (
        flag && (
          <tr key={p._id} className="border-b-2 md:hover:bg-[#f5f5f5]">
            <td>
              <div className="truncate w-[25ch]">{capitalize(p.name)}</div>
            </td>
            <td>
              <div className="w-max whitespace-nowrap">
                <button
                  onClick={showProductView}
                  data-id={p._id}
                  className="mr-2 md:hover:bg-[#efedf2] md:p-1"
                >
                  <i
                    className="fa-solid fa-eye text-green-400"
                    data-id={p._id}
                  ></i>
                  <br />
                  View
                </button>
                <button
                  onClick={showEditForm}
                  data-id={p._id}
                  className="mr-2 md:hover:bg-[#efedf2] md:p-1"
                >
                  <i className="fa-solid fa-pen-to-square" data-id={p._id}></i>
                  <br />
                  Edit
                </button>
                <button
                  data-id={p._id}
                  className="md:hover:bg-[#efedf2] md:p-1"
                  onClick={showDeleteView}
                >
                  <i
                    className="fa-solid fa-trash text-red-500"
                    data-id={p._id}
                  ></i>
                  <br />
                  Delete
                </button>
              </div>
            </td>
            <td>
              <div className="truncate w-[25ch]">
                {capitalize(p.category.name)}
              </div>
            </td>
            <td>
              <div className="truncate w-[15ch]">{p.price}</div>
            </td>
            <td>
              <div className="truncate w-[15ch]">{p.quantity}</div>
            </td>
            <td>
              <div className="truncate w-[15ch]">{p.price * p.quantity}</div>
            </td>
          </tr>
        )
      );
    });
    return allProducts.slice(limit.start - 1, limit.end);
  };
  return getProducts();
};

export default Product;
