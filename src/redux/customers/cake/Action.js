import {
    FIND_CAKE_PAGABLE_REQUEST, FIND_CAKE_PAGABLE_SUCCESS, FIND_CAKE_PAGABLE_FAILURE
} from "./ActionType"

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