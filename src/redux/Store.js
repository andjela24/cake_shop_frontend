import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk";
import authReducer from "./auth/Reducer";
import customerProductReducer from "./customers/product/Reducer";
import productReducer from "./admin/product/Reducer";
import cartReducer from "./customers/cart/Reducer";
import { orderReducer } from "./customers/order/Reducer";
import adminOrderReducer from "./admin/orders/Reducer";
import ReviewReducer from "./customers/review/Reducer";





const rootReducers=combineReducers({

    auth:authReducer,
    customersProduct:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    review:ReviewReducer,

    // admin
    adminsProduct:productReducer,
    adminsOrder:adminOrderReducer,


});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))