export const initialState = {
  provinces: [],
  cities: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROVINCES':
      return {
        ...state,
        provinces: action.payload
      };
    case 'SET_CITIES':
      return {
        ...state,
        cities: action.payload
      };
    default: 
      return state;
  }
};
