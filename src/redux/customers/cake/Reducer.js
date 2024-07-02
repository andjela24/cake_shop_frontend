import {
  FIND_CAKE_PAGABLE_REQUEST,
  FIND_CAKE_PAGABLE_SUCCESS,
  FIND_CAKE_PAGABLE_FAILURE,
} from "./ActionType";

const initialState = {
    cakes: [],
    totalElements: 0,
    pageSize: 10,
    pageNumber: 0,
    loading: false,
    error: null,
  };

const customerCakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CAKE_PAGABLE_REQUEST:
      return { ...state, loading: true, cakes: [], };
    case FIND_CAKE_PAGABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        cakes: action.payload,
        totalElements: action.totalElements,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
      };
    case FIND_CAKE_PAGABLE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default customerCakeReducer;
