import { createSlice } from "@reduxjs/toolkit";

const readOrders = () => {
  try {
    return JSON.parse(localStorage.getItem("furnitureHubOrders")) || [];
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem("furnitureHubOrders", JSON.stringify(orders));
};

const OrderSlice = createSlice({
  name: "orders",
  initialState: { orders: readOrders() },
  reducers: {
    addOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders.filter((x) => x.id !== action.payload.id)];
      saveOrders(state.orders);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      saveOrders(state.orders);
    },
    cancelOrder: (state, action) => {
      const order = state.orders.find((x) => x.id === action.payload);
      if (order) order.status = "Cancelled";
      saveOrders(state.orders);
    }
  }
});

export const { addOrder, setOrders, cancelOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
