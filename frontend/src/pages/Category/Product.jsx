import { capitalize } from '../../utils/capitalize';

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
        className="flex flex-col items-center text-start gap-2 border-2 p-4 lg:hover:shadow-lg max-w-full"
      >
        <img
          src={p.image.url}
          alt=" "
          className="max-h-[10rem] lg:max-h-[15rem]"
        />
        <h5 className="break-words font-bold md:text-xl max-w-full max-h-16 overflow-hidden">
          {capitalize(p.name)}
        </h5>
        <p className="break-words text-sm md:text-base overflow-auto max-w-full max-h-[6rem] md:max-h-[10rem] p-1">
          {p.description}
        </p>
        <p className="mt-auto overflow-hidden max-w-full border-t-2 self-stretch text-center font-semibold">
          Price : ${p.price}
        </p>
        <p className="overflow-hidden max-w-full text-center font-semibold">
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
