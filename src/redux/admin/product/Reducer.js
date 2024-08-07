import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  GET_PRODUCT_PAGABLE_REQUEST,
  GET_PRODUCT_PAGABLE_FAILURE,
  GET_PRODUCT_PAGABLE_SUCCESS,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "./ActionType";
import { UPDATE_PRODUCT_REQUEST } from "./ActionType";

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case GET_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_PAGABLE_REQUEST:
      return { ...state, loading: true, products: [] };
    case GET_PRODUCT_PAGABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        totalElements: action.totalElements,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
      };
    case GET_PRODUCT_PAGABLE_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
          product._id === action.payload._id ? action.payload : product
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
  return {
    ...state,
    loading: false,
    products: state.products.filter(
      (product) => product.id !== action.payload
    ),
  };

    // case DELETE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     products: state.products.filter(
    //       (product) => product._id !== action.payload
    //     ),
    //   };
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

export default productReducer;
