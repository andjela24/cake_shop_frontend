import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  INCREASE_CART_ITEM_WEIGHT_FAILURE,
  INCREASE_CART_ITEM_WEIGHT_REQUEST,
  INCREASE_CART_ITEM_WEIGHT_SUCCESS,
  DECREASE_CART_ITEM_WEIGHT_FAILURE,
  DECREASE_CART_ITEM_WEIGHT_REQUEST,
  DECREASE_CART_ITEM_WEIGHT_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
} from "./ActionType";

const initialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItems],
        loading: false,
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart: action.payload,
        loading: false,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case INCREASE_CART_ITEM_WEIGHT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INCREASE_CART_ITEM_WEIGHT_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case INCREASE_CART_ITEM_WEIGHT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DECREASE_CART_ITEM_WEIGHT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DECREASE_CART_ITEM_WEIGHT_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case DECREASE_CART_ITEM_WEIGHT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
