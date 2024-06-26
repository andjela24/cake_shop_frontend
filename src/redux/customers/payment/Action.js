import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
    CONFIRM_PAYMENT_SUCCESS,
    CONFIRM_PAYMENT_FAILURE
  } from './ActionType.js';
  import api, { API_BASE_URL } from "../../../config/api";
  import { getOrderById } from "../../../redux/customers/order/Action";
  import axios from 'axios';
  
  // export const createPayment = (reqData) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: CREATE_PAYMENT_REQUEST,
  //     });
  
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${reqData.jwt}`,
  //       },
  //     };
  //     const url = `/api/payments/create?total=${reqData.total}&currency=${reqData.currency}&description=${encodeURIComponent(reqData.description)}`;
  //     const { data } = await api.post(url, config);

  //     if (data.redirect_url) {
  //       window.location.href = data.redirect_url;
  //     }
  
  //     dispatch({
  //       type: CREATE_PAYMENT_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: CREATE_PAYMENT_FAILURE,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
  //   }
  // };

  export const createPayment = (reqData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PAYMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${reqData.jwt}`,
            },
        };

        const url = `/api/payments/create?total=${reqData.total}&currency=${reqData.currency}&description=${encodeURIComponent(reqData.description)}`;
        const { data } = await api.post(url, {}, config);

        if (data.redirect_url && data.paymentId) {
            // Sačuvajte paymentId u narudžbini
            const updateUrl = `/api/payments/updatePaymentId?orderId=${reqData.orderId}&paymentId=${data.paymentId}`;
            await api.put(updateUrl, {}, config);

            window.location.href = data.redirect_url;
        }

        dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_PAYMENT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const confirmPaymentSuccess = (paymentId, payerId, orderId) => async (dispatch) => {
  try {
      const url = `/api/payments/success?paymentId=${paymentId}&PayerID=${payerId}`;
      await api.get(url);

      dispatch(getOrderById(orderId));
      dispatch({ type: CONFIRM_PAYMENT_SUCCESS });

      console.log("Confirm payment URL:", url);

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


  //Ipak mi ne treba
  // export const confirmPaymentSuccess = (paymentId, payerId) => async (dispatch) => {
  //   try {
  //     const response = await api.get(`/api/payments/success?paymentId=${paymentId}&PayerID=${payerId}`);
  
  //     if (response.status === 200) {
  //       dispatch({
  //         type: CONFIRM_PAYMENT_SUCCESS,
  //         payload: response.data,
  //       });
  //     }
  
  //     return response;
  //   } catch (error) {
  //     console.error('Error confirming payment:', error);
  //     throw error;
  //   }
  // };

  // export const confirmPaymentSuccess = (paymentId, payerId) => async (dispatch) => {
  //   try {
  //     const response = await api.get(`/api/payments/success?paymentId=${paymentId}&PayerID=${payerId}`);
  
  //     // Pretpostavka da server vraća 200 OK ako je plaćanje uspešno
  //     if (response.status === 200) {
  //       dispatch({
  //         type: CONFIRM_PAYMENT_SUCCESS,
  //         payload: response.data, // Ovde možete proslediti podatke ako su potrebni
  //       });
  //     }
  
  //     return response; // Opciono: možete vratiti odgovor ako je potrebno obraditi u komponenti
  //   } catch (error) {
  //     console.error('Error confirming payment:', error);
  //     throw error; // Opciono: možete ponovo baciti grešku za dalju obradu
  //   }
  // };

  export const updatePayment = (reqData) => {
    return async (dispatch) => {
      console.log("update payment reqData ",reqData)
      dispatch(updatePaymentRequest());
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${reqData.jwt}`,
          },
        };
        const response = await axios.get(`${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,config);
        console.log("updated data",response.data)
        dispatch(updatePaymentSuccess(response.data));
      } catch (error) {
        dispatch(updatePaymentFailure(error.message));
      }
    };
  };

export const updatePaymentRequest = () => {
  return {
    type: UPDATE_PAYMENT_REQUEST,
  };
};

export const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payload: payment,
  };
};

export const updatePaymentFailure = (error) => {
  return {
    type: UPDATE_PAYMENT_FAILURE,
    payload: error,
  };
};

 
  