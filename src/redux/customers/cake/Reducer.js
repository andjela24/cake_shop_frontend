import {
  FIND_CAKES_REQUEST,
  FIND_CAKES_SUCCESS,
  FIND_CAKES_FAILURE,
  FIND_CAKES_BY_CATEGORY_REQUEST,
  FIND_CAKES_BY_CATEGORY_SUCCESS,
  FIND_CAKES_BY_CATEGORY_FAILURE,
  FIND_CAKE_BY_ID_REQUEST,
  FIND_CAKE_BY_ID_SUCCESS,
  FIND_CAKE_BY_ID_FAILURE,
  FIND_CAKE_PAGABLE_REQUEST,
  FIND_CAKE_PAGABLE_SUCCESS,
  FIND_CAKE_PAGABLE_FAILURE,
} from "./ActionType";

const initialState = {
  cakes: [],
  cake: null,
  totalElements: 0,
  pageSize: 10,
  pageNumber: 0,
  loading: false,
  error: null,
};

const customerCakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CAKES_REQUEST:
      return { ...state, cakesLoading: true, error: null, cakes: [] };
    case FIND_CAKES_SUCCESS:
      return {
        ...state,
        cakesLoading: false,
        error: null,
        cakes: action.payload,
      };
    case FIND_CAKES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_CAKES_BY_CATEGORY_REQUEST:
      return {
        ...state,
        cakesCategoryLoading: true,
        error: null,
        cakes: [],
      };
    case FIND_CAKES_BY_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_CAKE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_CAKE_BY_ID_SUCCESS:
      return { ...state, cake: action.payload, loading: false };
    case FIND_CAKE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_CAKES_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        cakesCategoryLoading: false,
        error: null,
        cakes: action.payload,
      };
    case FIND_CAKE_PAGABLE_REQUEST:
      return { ...state, loading: true, cakes: [] };
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
