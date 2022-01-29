export const initialState = {
  sizes: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SIZES':
      return {
        ...state,
        sizes: action.payload
      };
    default: 
      return state;
  }
};
