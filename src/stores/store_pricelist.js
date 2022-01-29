export const initialState = {
  prices: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRICES':
      return {
        ...state,
        prices: action.payload
      };
    default: 
      return state;
  }
};
