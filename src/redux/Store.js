import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import authReducer from "./auth/Reducer";
import flavorReducer from "./customers/flavor/Reducer";
import productReducer from "./admin/product/Reducer";
import cartReducer from "./customers/cart/Reducer";
import orderReducer from "./customers/order/Reducer";
import adminOrderReducer from "./admin/orders/Reducer";
import customerCakeReducer from "./customers/cake/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  flavors: flavorReducer,
  cart: cartReducer,
  order: orderReducer,
  customersCake: customerCakeReducer,

  // admin
  adminsProduct: productReducer,
  adminsOrder: adminOrderReducer,
});

export const store = legacy_createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
