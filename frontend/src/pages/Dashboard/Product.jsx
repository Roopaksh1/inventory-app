import { useContext } from "react";
import { ProductContext } from "./dashboard";
import ProductView from "./ProductView";
import DeleteButton from "../../components/DeleteButton";

const Product = ({ products, limit, search }) => {
  const {setView} = useContext(ProductContext);
  const showProductView = (e) => {
    const product = products.find((p) => p.id == e.target.getAttribute('data-id'));
    setView(<ProductView product={product}/>);
  }
  const showDeleteView = (e) => {
    const product = products.find((p) => p.id == e.target.getAttribute('data-id'));
    setView(<DeleteButton product={product}/>);
  }
  const showEditView = (e) => {
    const product = products.find((p) => p.id == e.target.getAttribute('data-id'));
    setView(<ProductView product={product}/>);
  }
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
            <td>{p.name}</td>
            <td>
              <button onClick={showProductView}
                data-id={p.id}
                className="mr-2 md:hover:bg-[#efedf2] md:p-1"
              >
                <i className="fa-solid fa-eye text-green-400" data-id={p.id}></i>
                <br />
                View
              </button>
              <button
                data-id={p.id}
                className="mr-2 md:hover:bg-[#efedf2] md:p-1"
              >
                <i className="fa-solid fa-pen-to-square" data-id={p.id}></i>
                <br />
                Edit
              </button>
              <button data-id={p.id} className="md:hover:bg-[#efedf2] md:p-1" onClick={showDeleteView}>
                <i className="fa-solid fa-trash text-red-500" data-id={p.id}></i>
                <br />
                Delete
              </button>
            </td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td>{p.price * p.quantity}</td>
          </tr>
        )
      );
    });
    return allProducts.slice(limit.start - 1, limit.end);
  };
  return getProducts();
};

export default Product;
