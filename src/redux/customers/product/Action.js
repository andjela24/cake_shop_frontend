import axios from "axios";

import {
  FIND_CAKES_REQUEST,
  FIND_CAKE_PAGABLE_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FIND_CAKE_PAGABLE_SUCCESS,
  FIND_CAKE_PAGABLE_FAILURE,
  FIND_CAKES_SUCCESS,
  FIND_CAKES_FAILURE,
  FIND_CAKES_BY_CATEGORY_REQUEST,
  FIND_CAKES_BY_CATEGORY_SUCCESS,
  FIND_CAKES_BY_CATEGORY_FAILURE,
  FIND_CAKE_BY_ID_REQUEST,
  FIND_CAKE_BY_ID_SUCCESS,
  FIND_CAKE_BY_ID_FAILURE
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";

export const findAllCakes = () => async (dispatch) => {
    try {
      dispatch({ type: FIND_CAKES_REQUEST });

      const { data } = await api.get(`/api/user-cake`);

      console.log("Find all cakes - ", data);
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

    console.log("Find Cake By Category - ", data);
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

    console.log("Find Cake By Id - ", data);
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

// export const findCakeById = (reqData) => async (dispatch) => {
//   try {
//     dispatch({ type: FIND_CAKE_BY_ID_REQUEST });

//     const { data } = await api.get(`/api/user-cake/cakes/id/${reqData.cakeId}`);

//     console.log("cAKES by  id : ", data);
//     dispatch({
//       type: FIND_CAKE_BY_ID_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FIND_CAKE_BY_ID_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

//Kod mene je Cakes pagable
//category, minWeight, maxWeight, minTier, maxTier, sort, pageNumber, PageSize
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

    console.log("Cakes Pagable - ", data);
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
export const findProducts = (reqData) => async (dispatch) => {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_REQUEST });

    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    console.log("get product by category - ", data);
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const findProductById = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const { data } = await api.get(`/api/products/id/${reqData.productId}`);

    console.log("products by  id : ", data);
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
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

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/products/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
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

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/products/${product.productId}`,
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

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action", productId);
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let { data } = await api.delete(`/api/admin/products/${productId}/delete`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("product delte ", data);
  } catch (error) {
    console.log("catch error ", error);
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
