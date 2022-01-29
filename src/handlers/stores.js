import { createContext, useReducer } from 'react'

export const initialState = {
  lists: [],
  listFilters: [],
  listCurrent: {},
  provinces: [],
  cities: [],
  sizes: [],
  searchStatus: false,
  loading: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_STATUS': 
      return {
        ...state,
        searchStatus: action.payload || false
      }
    case 'SET_LOADING': 
      return {
        ...state,
        loading: action.payload || false
      }
    case 'SET_LISTS':
      return {
        ...state,
        lists: action.payload
      };
    case 'SET_LISTS_FILTER':
      return {
        ...state,
        listFilters: action.payload
      };
    case 'SET_LIST_CURRENT':
      return {
        ...state,
        listCurrent: action.payload
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
