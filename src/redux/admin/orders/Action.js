
import api from "../../../config/api";
import {
  canceledOrderFailure,
  canceledOrderRequest,
  canceledOrderSuccess,
  confirmedOrderFailure,
  confirmedOrderRequest,
  confirmedOrderSuccess,
  deleteOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deliveredOrderFailure,
  deliveredOrderRequest,
  deliveredOrderSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
  placedOrderFailure,
  placedOrderRequest,
  placedOrderSuccess,
  shipOrderFailure,
  shipOrderRequest,
  shipOrderSuccess,
} from "./ActionCreator";
import { GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "./ActionType";

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });

    const { data } = await api.get(`/api/admin/orders`);

    console.log("Find all orders - ", data);
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
// export const getOrders = (reqData) => {
//   console.log("get all orders ", reqData);
//   return async (dispatch) => {
//     dispatch(getOrdersRequest());
//     try {
     
//       const response = await api.get(`/api/admin/orders/`);
//       console.log("get all orders ", response.data);
//       dispatch(getOrdersSuccess(response.data));
//     } catch (error) {
//       console.log("catch error ", error);
//       dispatch(getOrdersFailure(error.message));
//     }
//   };
// };

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch(confirmedOrderRequest());

  try {
    const response = await api.put(
      `/api/admin/orders/${orderId}/confirmed`
    );
    const data = response.data;
    console.log("confirm_order ",data)
    dispatch(confirmedOrderSuccess(data));
  } catch (error) {
    dispatch(confirmedOrderFailure(error.message));
  }
};

export const shipOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(shipOrderRequest());
      const {data} = await api.put(`/api/admin/orders/${orderId}/shipped`);
      console.log(" shipped order",data)
      dispatch(shipOrderSuccess(data));
    } catch (error) {
      dispatch(shipOrderFailure(error.message));
    }
  };
};

export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch(deliveredOrderRequest());

  try {
    const response = await api.put(
      `/api/admin/orders/${orderId}/delivered`
    );
    const data = response.data;
    console.log("dilivered order ",data)
    dispatch(deliveredOrderSuccess(data));
  } catch (error) {
    dispatch(deliveredOrderFailure(error.message));
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(canceledOrderRequest());

  try {
    const response = await api.put(
      `/api/admin/orders/${orderId}/canceled`
    );
    const data = response.data;
    dispatch(canceledOrderSuccess(data));
  } catch (error) {
    dispatch(canceledOrderFailure(error.message));
  }
};

// Async action creator for deleting an order
export const deleteOrder = (orderId) => {
  return async(dispatch) => {
    dispatch(deleteOrderRequest());     
   try {
     const {data} = await api.delete(`/api/admin/orders/${orderId}/delete`);
     console.log("delete order ",data)
     dispatch(deleteOrderSuccess(orderId));
   } catch (error) {
    console.log("catch error ",error)
     dispatch(deleteOrderFailure(error));
   }
      
  };
};

// export const placeOrder = (order) => async (dispatch) => {
//   dispatch(placedOrderRequest());

//   try {
//     const response = await api.post(`/api/admin/orders/`, order);
//     const data = response.data;
//     dispatch(placedOrderSuccess(data));
//   } catch (error) {
//     dispatch(placedOrderFailure(error.message));
//   }
// };
