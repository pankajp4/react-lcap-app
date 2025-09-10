import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormConfig } from "../../types/builder";

interface HistoryState {
  past: FormConfig[];
  future: FormConfig[];
  maxHistorySize: number;
}

const initialState: HistoryState = {
  past: [],
  future: [],
  maxHistorySize: 50, // Limit history size to prevent memory issues
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<FormConfig>) => {
      state.past = [...state.past, action.payload].slice(-state.maxHistorySize);
      state.future = [];
    },
    undo: (state) => {
      const previous = state.past[state.past.length - 1];
      if (previous) {
        state.past = state.past.slice(0, -1);
        state.future = [previous, ...state.future];
      }
    },
    redo: (state) => {
      const next = state.future[0];
      if (next) {
        state.future = state.future.slice(1);
        state.past = [...state.past, next];
      }
    },
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    },
  },
});

export const { addToHistory, undo, redo, clearHistory } = historySlice.actions;
export default historySlice.reducer;
