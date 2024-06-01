import { configureStore } from "@reduxjs/toolkit";
import selectedCoinsReducer from "./slice/selectedCoinsSlice/index";

const store = configureStore({
  reducer: {
    selectedCoins: selectedCoinsReducer,
  },
});

export default store;
