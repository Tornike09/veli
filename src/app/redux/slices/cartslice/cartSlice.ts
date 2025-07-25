import { IProduct } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart extends IProduct {
  qty: number;
}

const initialState: ICart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.qty += 1;
      }
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
