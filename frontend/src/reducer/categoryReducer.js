export const initialCategoryState = {
  category: null,
  product: null,
  loading: true,
};

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'data_fetched': {
      return {
        ...state,
        category: action.payload,
      };
    }
    case 'loaded': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'selected': {
      return {
        ...state,
        product: action.payload,
      };
    }
    case 'back': {
      return {
        ...state,
        product: null,
      };
    }
  }
};
