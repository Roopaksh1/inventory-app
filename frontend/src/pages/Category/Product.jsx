const Product = ({ product = [], dispatch }) => {
  const goBack = () => {
    dispatch({
      type: 'back',
    });
  };

  const mapProduct = () => {
    return product.map((p) => (
      <div
        key={p._id}
        className="flex flex-col w-[20rem] items-center text-start gap-2 border-2 p-2 lg:hover:shadow-lg"
      >
        <img src={p.image} alt=" " />
        <h5 className="font-bold md:text-xl ">{p.name}</h5>
        <p className="text-sm md:text-base overflow-auto max-h-[6rem] md:max-h-[10rem] p-1">
          {p.description}
        </p>
        <p className="border-t-2 self-stretch text-center font-semibold">
          Price : ${p.price}
        </p>
        <p>
          {p.quantity == 0 ? (
            <span className="text-red-500">Out Of Stock</span>
          ) : (
            `Quantity : ${p.quantity}`
          )}
        </p>
      </div>
    ));
  };
  return (
    <main className="p-4 overflow-auto">
      <button
        className="mb-4 md:text-xl inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
        onClick={goBack}
      >
        Back
      </button>
      <section className="product justify-items-center">{mapProduct()}</section>
    </main>
  );
};

export default Product;
