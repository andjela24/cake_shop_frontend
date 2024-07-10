import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  CONFIRM_PAYMENT_SUCCESS,
  CONFIRM_PAYMENT_FAILURE,
} from "./ActionType.js";
import api from "../../../config/api";
import { getOrderById } from "../../../redux/customers/order/Action";

export const createPayment = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PAYMENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const url = `/api/payments/create?total=${reqData.total}&currency=${
      reqData.currency
    }&description=${encodeURIComponent(reqData.description)}`;
    const { data } = await api.post(url, {}, config);

    if (data.redirect_url && data.paymentId) {
      const updateUrl = `/api/payments/updatePaymentId?orderId=${reqData.orderId}&paymentId=${data.paymentId}`;
      await api.put(updateUrl, {}, config);

      window.location.href = data.redirect_url;
    }

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const confirmPaymentSuccess =
  (paymentId, payerId, orderId) => async (dispatch) => {
    try {
      const url = `/api/payments/success?paymentId=${paymentId}&PayerID=${payerId}`;
      await api.get(url);

      dispatch(getOrderById(orderId));
      dispatch({ type: CONFIRM_PAYMENT_SUCCESS });

    } catch (error) {
      dispatch({
        type: CONFIRM_PAYMENT_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
