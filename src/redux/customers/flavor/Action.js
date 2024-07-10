import {
  FETCH_FLAVORS_REQUEST,
  FETCH_FLAVORS_SUCCESS,
  FETCH_FLAVORS_FAILURE,
} from "./ActionType";
import api from "../../../config/api";

export const fetchFlavors = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FLAVORS_REQUEST });

    const { data } = await api.get(`/api/flavors`);

    dispatch({
      type: FETCH_FLAVORS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_FLAVORS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
