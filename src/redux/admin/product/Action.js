import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_PAGABLE_FAILURE,
  GET_PRODUCT_PAGABLE_REQUEST,
  GET_PRODUCT_PAGABLE_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "./ActionType";
import api from "../../../config/api";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    const { data } = await api.get(`/api/admin/cakes`);
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductById = (cakeId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });

    const { data } = await api.get(`/api/user-cake/cakes/${cakeId}`);

    dispatch({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await api.put(
      `/api/admin/cakes/${product.productId}`,
      product
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });

    const { data } = await api.get(`/api/admin/cakes/categories`);
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productsPagable = (reqData) => async (dispatch) => {
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
    dispatch({ type: GET_PRODUCT_PAGABLE_REQUEST });

    const { data } = await api.get(
      `/api/user-cake/cakes?category=${category}&minWeight=${minWeight}&maxWeight=${maxWeight}&minTier=${minTier}&maxTier=${maxTier}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    dispatch({
      type: GET_PRODUCT_PAGABLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_PAGABLE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post(`/api/admin/cakes`, product.data);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await api.delete(`/api/admin/cakes/${productId}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const deleteProduct = (data) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });

//     await api.delete(`/api/admin/cakes/${data.productId}`);

//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: data.productId,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_PRODUCT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
