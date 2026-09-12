import { createSlice } from "@reduxjs/toolkit";

const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("furnitureHubWishlist")) || [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  localStorage.setItem("furnitureHubWishlist", JSON.stringify(items));
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: readWishlist() },
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.items.some((x) => x.id === action.payload.id)) {
        state.items.push(action.payload);
      }
      saveWishlist(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
      saveWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlist([]);
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  WishlistSlice.actions;

export default WishlistSlice.reducer;
