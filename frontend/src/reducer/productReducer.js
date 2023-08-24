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
    case 'deleted': {
      return {
        ...state,
        data: action.data,
        totalCategory: action.length,
      };
    }
    case 'updated': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'added': {
      return {
        ...state,
        data: action.payload,
      };
    }
  }
};
