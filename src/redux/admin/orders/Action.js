import api from "../../../config/api";
import {
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  CONFIRMED_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
  DELIVERED_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  CANCELED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_FAILURE,
} from "./ActionType";

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });

    const { data } = await api.get(`/api/admin/orders`);

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    const data = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    dispatch({
      type: CONFIRMED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIRMED_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: SHIP_ORDER_REQUEST });
    const data = await api.put(`/api/admin/orders/${orderId}/delivered`);
    dispatch({
      type: SHIP_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIP_ORDER_SUCCESS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliveredOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    const data = await api.put(`/api/admin/orders/${orderId}/delivered`);
    dispatch({
      type: DELIVERED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERED_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCELED_ORDER_REQUEST });
    const data = await api.put(`/api/admin/orders/${orderId}/canceled`);
    dispatch({
      type: CANCELED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCELED_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const data = await api.put(`/api/admin/orders/${orderId}/delete`);
    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
