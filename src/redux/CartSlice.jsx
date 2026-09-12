import { createSlice } from "@reduxjs/toolkit";

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem("furnitureHubCart")) || [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem("furnitureHubCart", JSON.stringify(items));
};

const CartSlice = createSlice({
  name: "cart",
  initialState: { items: readCart() },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((x) => x.id === product.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
      saveCart(state.items);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((x) => x.id !== action.payload);
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = CartSlice.actions;

export default CartSlice.reducer;
