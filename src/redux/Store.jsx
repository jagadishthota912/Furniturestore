import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import WishlistReducer from "./WishlistSlice";
import OrderReducer from "./OrderSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    wishlist: WishlistReducer,
    orders: OrderReducer
  }
});

export default store;
