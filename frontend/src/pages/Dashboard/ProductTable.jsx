import { useEffect, useRef, useState } from 'react';
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
    display.start === 1 ? (
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

  return (
    <div className=" max-w-full sm:self-stretch">
      <div className='overflow-auto flex flex-col'>
        <table className="shadow border table-fixed min-w-max text-center">
          <thead className="">
            <tr className="border-b-2">
              <th className='w-[10rem]'>Name</th>
              <th>Action</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody className="">
            <Product products={products} limit={display} search={query} />
          </tbody>
        </table>
      </div>
      <table className="shadow border w-full overflow-auto">
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
