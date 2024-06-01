import { createSlice } from "@reduxjs/toolkit";

const selectedCoinsSlice = createSlice({
  name: "selectedCoins",
  initialState: [],
  reducers: {
    addCoin: (state, action) => {
      state.push(action.payload);
    },
    removeCoin: (state, action) => {
      return state.filter((coin) => coin !== action.payload);
    },
  },
});

export const { addCoin, removeCoin } = selectedCoinsSlice.actions;
export default selectedCoinsSlice.reducer;
