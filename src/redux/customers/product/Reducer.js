import {
  FIND_CAKES_REQUEST,
  FIND_CAKE_PAGABLE_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  FIND_CAKES_SUCCESS,
  FIND_CAKES_BY_CATEGORY_REQUEST,
  FIND_CAKES_BY_CATEGORY_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  deleteProduct: null,
};

const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CAKES_REQUEST:
      return { ...state, cakesLoading: true, error: null, products: [] };
    case FIND_CAKES_SUCCESS:
      return {
        ...state,
        cakesLoading: false,
        error: null,
        products: action.payload,
      };
    case FIND_CAKES_BY_CATEGORY_REQUEST:
      return { ...state, cakesCategoryLoading: true, error: null, products: [] };
    case FIND_CAKES_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        cakesCategoryLoading: false,
        error: null,
        products: action.payload,
      };
    case FIND_CAKE_PAGABLE_REQUEST:
      return { ...state, loading: true, error: null, products: [] };
    case FIND_PRODUCTS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null, products: [] };
    case FIND_PRODUCTS_BY_CATEGORY_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case FIND_PRODUCTS_BY_CATEGORY_FAILURE:
      return { ...state, loading: false, products: [], error: action.payload };
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      console.log("dlete ", state.products);
      return {
        ...state,
        loading: false,
        deleteProduct: action.payload,
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerProductReducer;
