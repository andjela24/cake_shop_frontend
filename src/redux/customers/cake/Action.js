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
import api from "../../../config/api";

export const findAllCakes = () => async (dispatch) => {
  try {
    dispatch({ type: FIND_CAKES_REQUEST });

    const { data } = await api.get(`/api/user-cake`);

    dispatch({
      type: FIND_CAKES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_CAKES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findCakesByCategory = (reqData) => async (dispatch) => {
const { category } = reqData;

try {
  dispatch({ type: FIND_CAKES_BY_CATEGORY_REQUEST });

  const { data } = await api.get(`/api/user-cake/cake/category`, {
    params: { q: category },
  });

  dispatch({
    type: FIND_CAKES_BY_CATEGORY_SUCCESS,
    payload: data,
  });
} catch (error) {
  dispatch({
    type: FIND_CAKES_BY_CATEGORY_FAILURE,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};
export const findCakeById = (cakeId) => async (dispatch) => {
try {
  dispatch({ type: FIND_CAKE_BY_ID_REQUEST });

  const { data } = await api.get(`/api/user-cake/cakes/${cakeId}`);

  dispatch({
    type: FIND_CAKE_BY_ID_SUCCESS,
    payload: data,
  });
} catch (error) {
  dispatch({
    type: FIND_CAKE_BY_ID_FAILURE,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};

export const cakesPagable = (reqData) => async (dispatch) => {
  const {
    category,
    minWeight,
    maxWeight,
    minTier,
    maxTier,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    dispatch({ type: FIND_CAKE_PAGABLE_REQUEST });

    const { data } = await api.get(
      `/api/user-cake/cakes?category=${category}&minWeight=${minWeight}&maxWeight=${maxWeight}&minTier=${minTier}&maxTier=${maxTier}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    dispatch({
      type: FIND_CAKE_PAGABLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_CAKE_PAGABLE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
