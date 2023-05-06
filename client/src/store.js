import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, ownProductReducer, productDetailsReducer, productReducer, productsReducer } from "./reducers/productReducer";
import { allCustomerReducer, allFarmersReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    userDetail : userReducer,
    profile : profileReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails : orderDetailsReducer,
    newReview : newReviewReducer,
    newProduct : newProductReducer,
    product : productsReducer,
    allOrders : allOrdersReducer,
    order : orderReducer,
    allFarmers : allFarmersReducer,
    allCustomer : allCustomerReducer,
    myProducts : ownProductReducer,
});

let initialState = {
    cart : {
        cartItems : localStorage.getItem("cartItems") ? 
        JSON.parse(localStorage.getItem("cartItems"))
        : [],
        transportInfo : localStorage.getItem("transportInfo") ?
        JSON.parse(localStorage.getItem("transportInfo"))
        : [],
    },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;