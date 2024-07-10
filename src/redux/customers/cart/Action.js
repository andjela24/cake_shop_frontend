import {
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  INCREASE_CART_ITEM_WEIGHT_FAILURE,
  INCREASE_CART_ITEM_WEIGHT_REQUEST,
  INCREASE_CART_ITEM_WEIGHT_SUCCESS,
  DECREASE_CART_ITEM_WEIGHT_FAILURE,
  DECREASE_CART_ITEM_WEIGHT_REQUEST,
  DECREASE_CART_ITEM_WEIGHT_SUCCESS,
} from "./ActionType";

import api from "../../../config/api";

export const addItemToCart = (itemData, jwt) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    const { data } = await api.put(`/api/carts/add`, itemData, config);

    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCart = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    const { data } = await api.get(`/api/carts`, config);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const increaseCartItemWeight = (cartItemId, jwt) => async (dispatch) => {
  try {
    dispatch({ type: INCREASE_CART_ITEM_WEIGHT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.put(
      `/api/cart-items/${cartItemId}/increase-weight`,
      {},
      config
    );

    dispatch({
      type: INCREASE_CART_ITEM_WEIGHT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INCREASE_CART_ITEM_WEIGHT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const decreaseCartItemWeight = (cartItemId, jwt) => async (dispatch) => {
  try {
    dispatch({ type: DECREASE_CART_ITEM_WEIGHT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.put(
      `/api/cart-items/${cartItemId}/decrease-weight`,
      {},
      config
    );

    dispatch({
      type: DECREASE_CART_ITEM_WEIGHT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECREASE_CART_ITEM_WEIGHT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCartItem = (cartItemId, jwt) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    await api.delete(`/api/cart-items/${cartItemId}`, config);

    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: cartItemId,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error.message,
    });
  }
};
