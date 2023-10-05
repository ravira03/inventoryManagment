import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducer";

export const { saveProduct, saveProductSuccess, saveProductFailure } = productSlice.actions;

const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

export default store;
