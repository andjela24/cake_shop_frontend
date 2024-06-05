
import {
    FETCH_FLAVORS_REQUEST,
    FETCH_FLAVORS_SUCCESS,
    FETCH_FLAVORS_FAILURE,
  } from "./ActionType";

const initialState = {
    flavors: [],
    flavor: null,
    loading: false,
    error: null,
    deleteProduct: null,
  };

  const flavorReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FLAVORS_REQUEST:
        return { ...state, loading: true, error: null, flavors: [] };
      case FETCH_FLAVORS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          flavors: action.payload,
        };
        case FETCH_FLAVORS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default flavorReducer;