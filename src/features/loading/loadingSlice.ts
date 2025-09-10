import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  [key: string]: boolean;
}

const initialState: LoadingState = {};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{ key: string; isLoading: boolean }>
    ) => {
      const { key, isLoading } = action.payload;
      state[key] = isLoading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
