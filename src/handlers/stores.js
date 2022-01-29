import { createContext, useReducer } from 'react'

export const initialState = {
  lists: [],
  listFilters: [],
  provinces: [],
  cities: [],
  sizes: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LISTS':
      return {
        ...state,
        lists: action.payload
      };
    case 'SET_LIST_FILTER':
      return {
        ...state,
        listFilters: action.payload
      };
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
    case 'SET_SIZES':
      return {
        ...state,
        sizes: action.payload
      };
    default: 
      return state;
  }
};

export const StoreContext = createContext({ state: initialState, dispatch: () => null });

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </StoreContext.Provider>
  )
}
