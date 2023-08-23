export const initialState = {
  data: null,
  loading: true,
}

export const productReducer = (state, action) => {
  switch(action.type) {
    case 'data_fetched' : {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'loaded' : {
      return {
        ...state,
        loading: false,
      }
    }
  }
}