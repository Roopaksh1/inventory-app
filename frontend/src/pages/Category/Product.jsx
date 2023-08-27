import Button from '../../components/Button';
import { capitalize } from '../../utils/capitalize';
import PropTypes from 'prop-types';

const Product = ({ product, dispatch }) => {
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
      <Button action={goBack} style={'mb-4 md:text-xl w-auto'}>
        Back
      </Button>
      <section className="product">{mapProduct()}</section>
    </main>
  );
};

Product.propTypes = {
  product: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Product;
