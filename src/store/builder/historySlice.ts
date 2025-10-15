/**
 * @module Features/Builder
 * @description
 * Redux slice for managing the form builder's undo/redo history.
 * Implements a memory-efficient history stack for form state changes.
 * @category State Management
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormConfig } from "@/types/builder";

/**
 * Interface defining the history state structure
 * @interface
 * @category State
 * @since 1.0.0
 *
 * @remarks
 * The history state maintains two stacks:
 * - past: Previous form states for undo operations
 * - future: Undone states for redo operations
 *
 * Features:
 * - Limited history size to prevent memory issues
 * - Bidirectional navigation (undo/redo)
 * - Automatic cleanup of future states on new changes
 * - Memory-efficient state management
 */
interface HistoryState {
  /** Array of previous form states */
  past: FormConfig[];
  /** Array of undone form states */
  future: FormConfig[];
  /** Maximum number of states to keep in history */
  maxHistorySize: number;
}

/**
 * Initial state for the history slice
 * @constant
 * @category State
 *
 * @remarks
 * Default configuration:
 * - Empty past and future stacks
 * - 50 states maximum history size
 *
 * The maxHistorySize limit prevents excessive memory usage
 * while maintaining a reasonable undo/redo depth.
 */
const initialState: HistoryState = {
  past: [],
  future: [],
  maxHistorySize: 50, // Limit history size to prevent memory issues
};

/**
 * Redux slice for history management
 * @constant
 * @category Redux
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * // Add current form state to history
 * dispatch(addToHistory(currentFormState));
 *
 * // Undo last change
 * dispatch(undo());
 *
 * // Redo previously undone change
 * dispatch(redo());
 *
 * // Clear all history
 * dispatch(clearHistory());
 * ```
 */
export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    /**
     * Adds a form state to the history stack
     * @param state - Current history state
     * @param action - Form state to add to history
     *
     * @remarks
     * - Maintains history size limit
     * - Clears future states (redo stack)
     * - Preserves most recent changes
     */
    addToHistory: (state, action: PayloadAction<FormConfig>) => {
      state.past = [...state.past, action.payload].slice(-state.maxHistorySize);
      state.future = [];
    },

    /**
     * Reverts to the previous form state
     * @param state - Current history state
     *
     * @remarks
     * - Moves current state to future stack
     * - Updates past stack for sequential undos
     * - No-op if no past states exist
     */
    undo: (state) => {
      const previous = state.past[state.past.length - 1];
      if (previous) {
        state.past = state.past.slice(0, -1);
        state.future = [previous, ...state.future];
      }
    },

    /**
     * Restores a previously undone form state
     * @param state - Current history state
     *
     * @remarks
     * - Moves state from future to past stack
     * - Updates stacks for sequential redos
     * - No-op if no future states exist
     */
    redo: (state) => {
      const next = state.future[0];
      if (next) {
        state.future = state.future.slice(1);
        state.past = [...state.past, next];
      }
    },

    /**
     * Clears all history states
     * @param state - Current history state
     *
     * @remarks
     * - Resets both past and future stacks
     * - Useful when loading new forms
     * - Cannot be undone
     */
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    },
  },
});

export const { addToHistory, undo, redo, clearHistory } = historySlice.actions;
export default historySlice.reducer;
