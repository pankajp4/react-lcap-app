import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { BuilderComponent } from "../../types/builder";

interface FormState {
  elements: BuilderComponent[];
}

const initialState: FormState = {
  elements: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addElement(state, action: PayloadAction<BuilderComponent>) {
      state.elements.push(action.payload);
    },
    removeElement(state, action: PayloadAction<number>) {
      state.elements.splice(action.payload, 1);
    },
  },
});

export const { addElement, removeElement } = formSlice.actions;
export default formSlice.reducer;
