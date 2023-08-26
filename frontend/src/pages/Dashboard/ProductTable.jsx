import { useEffect, useState } from 'react';
import Product from './Product';

const ProductTable = ({ products, query }) => {
  const STEP = 5;
  const initStart = products.length === 0 ? 0 : 1;
  const initEnd = products.length >= STEP ? STEP : products.length;
  const [display, setDisplay] = useState({ start: initStart, end: initEnd });
  const handleBack = () => {
    if (display.end - STEP <= STEP) {
      setDisplay((prevState) => {
        return {
          start: prevState.start - STEP,
          end: STEP,
        };
      });
    } else {
      let temp = STEP;
      if (STEP > display.end - display.start + 1) {
        temp = display.end - display.start + 1;
      }
      setDisplay((prevState) => {
        return {
          start: prevState.start - STEP,
          end: prevState.end - temp,
        };
      });
    }
  };

  const handleForward = () => {
    if (display.end + STEP > products.length) {
      setDisplay((prevState) => {
        return {
          start: prevState.start + STEP,
          end: products.length,
        };
      });
    } else {
      setDisplay((prevState) => {
        return {
          start: prevState.start + STEP,
          end: prevState.end + STEP,
        };
      });
    }
  };

  let buttonBack =
    display.start === 1 || display.start === 0 ? (
      <button disabled onClick={handleBack}>
        <i className="fa-solid fa-chevron-left mx-6 text-gray-400"></i>
      </button>
    ) : (
      <button onClick={handleBack}>
        <i className="fa-solid fa-chevron-left mx-6 "></i>
      </button>
    );
  let buttonForward =
    display.end === products.length ? (
      <button disabled onClick={handleForward}>
        <i className="fa-solid fa-chevron-right mx-6 text-gray-400"></i>
      </button>
    ) : (
      <button onClick={handleForward}>
        <i className="fa-solid fa-chevron-right mx-6 "></i>
      </button>
    );

  useEffect(() => {
    if (products.length === 0) {
      setDisplay({
        start: 0,
        end: 0,
      });
      return;
    }
    if (products.length <= STEP) {
      setDisplay({
        start: 1,
        end: products.length,
      });
    } else if (
      display.end > products.length &&
      display.start > products.length
    ) {
      setDisplay((prevState) => {
        return {
          start: prevState.start - STEP,
          end: products.length,
        };
      });
    } else if (display.end > products.length) {
      setDisplay({ ...display, end: products.length });
    }
  }, [products]);

  return (
    <div className=" max-w-full sm:self-stretch">
      <div className="overflow-auto w-[80vw]">
        <table className="shadow border text-center w-full text-sm lg:text-base">
          <thead className="">
            <tr className="border-b-2">
              <th>
                <div className="lg:w-[25ch] w-[15ch]">Name</div>
              </th>
              <th>
                <div className=" whitespace-nowrap">Action</div>
              </th>
              <th>
                <div className="lg:w-[25ch] w-[15ch]">Category</div>
              </th>
              <th>
                <div className="w-[10ch]">Price</div>
              </th>
              <th>
                <div className="w-[10ch]">Quantity</div>
              </th>
              <th>
                <div className="w-[10ch]">Value</div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            <Product products={products} limit={display} search={query} />
          </tbody>
        </table>
      </div>
      <table className="shadow border w-full overflow-auto text-sm lg:text-base">
        <tfoot className="">
          <tr className="font-bold">
            <td className=" text-end">
              {display.start}-{display.end} of {products.length} {buttonBack}
              {buttonForward}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
