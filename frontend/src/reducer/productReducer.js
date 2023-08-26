export const initialProductState = {
  data: null,
  loading: true,
  totalCategory: 0,
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'data_fetched': {
      return {
        ...state,
        data: action.data,
        totalCategory: action.length,
      };
    }
    case 'loaded': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'deleted_product': {
      return {
        ...state,
        data: action.data,
        totalCategory: action.length,
      };
    }
    case 'updated_product': {
      const modifiedData = state.data.map((product) => {
        if (product._id === action.data._id)
          return action.data;
        return product;
      });
      const length = action.categoryDeleted
        ? state.totalCategory - 1
        : state.totalCategory;
      return {
        ...state,
        data: modifiedData,
        totalCategory: length,
      };
    }
    case 'added_product': {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case 'added_category': {
      return {
        ...state,
        totalCategory: state.totalCategory + 1,
      };
    }
  }
};
