import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  elements: any[];
}

const initialState: FormState = {
  elements: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addElement(state, action: PayloadAction<any>) {
      state.elements.push(action.payload);
    },
    removeElement(state, action: PayloadAction<number>) {
      state.elements.splice(action.payload, 1);
    },
  },
});

export const { addElement, removeElement } = formSlice.actions;
export default formSlice.reducer;
