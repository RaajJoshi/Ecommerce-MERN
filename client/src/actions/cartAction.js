import { ADD_TO_CART, 
  REMOVE_CART_ITEM, 
  SAVE_SHIPPING_INFO,
  REMOVE_ITEMS,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quant) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.quantity,
        image: data.product.images[0].url,
        quant,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("transportInfo", JSON.stringify(data));
};

// REMOVE ITEMS
export const removeItems = () => async (dispatch) => {
  dispatch({
    type: REMOVE_ITEMS,
  });

  localStorage.removeItem("cartItems");
  localStorage.removeItem("transportInfo");

};
