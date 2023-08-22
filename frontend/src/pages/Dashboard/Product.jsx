const Product = ({ products, limit, search }) => {
  const getProducts = () => {
    const allProducts = products.map((p) => {
      let flag = true;
      if (search.trimStart() != '') {
        if (!p.name.match(new RegExp(search, 'i'))) {
          flag = false;
        }
      }
      return (
        flag && (
          <tr key={p.id} className="border-b-2 md:hover:bg-[#f5f5f5]">
            <td>{p.name}</td>
            <td>
              <button
                data-id={p.id}
                className="mr-2 md:hover:bg-[#efedf2] md:p-1"
              >
                <i className="fa-solid fa-eye text-green-400"></i>
                <br />
                View
              </button>
              <button
                data-id={p.id}
                className="mr-2 md:hover:bg-[#efedf2] md:p-1"
              >
                <i className="fa-solid fa-pen-to-square"></i>
                <br />
                Edit
              </button>
              <button data-id={p.id} className="md:hover:bg-[#efedf2] md:p-1">
                <i className="fa-solid fa-trash text-red-500"></i>
                <br />
                Delete
              </button>
            </td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td>{p.value}</td>
          </tr>
        )
      );
    });
    return allProducts.slice(limit.start - 1, limit.end);
  };
  return getProducts();
};

export default Product;
