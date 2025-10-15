/**
 * @module Features/Form
 * @description
 * Redux slice for managing form state and elements in the form builder.
 * Handles the addition and removal of form components.
 * @category State Management
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BuilderComponent } from "@/types/builder";

/**
 * Interface defining the form state structure
 * @interface
 * @category State
 * @since 1.0.0
 *
 * @remarks
 * The form state maintains:
 * - List of form elements/components
 * - Order and structure of the form
 *
 * This state represents the runtime form structure,
 * separate from the builder's editing state.
 */
interface FormState {
  /** Array of form components in order of appearance */
  elements: BuilderComponent[];
}

/**
 * Initial state for the form slice
 * @constant
 * @category State
 *
 * @remarks
 * Starts with an empty form (no elements)
 */
const initialState: FormState = {
  elements: [],
};

/**
 * Redux slice for form management
 * @constant
 * @category Redux
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * // Add a new form element
 * dispatch(addElement({
 *   id: 'text-1',
 *   type: 'textbox',
 *   props: { label: 'Name' }
 * }));
 *
 * // Remove an element at index 2
 * dispatch(removeElement(2));
 * ```
 */
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    /**
     * Adds a new element to the form
     * @param state - Current form state
     * @param action - Component to add to the form
     *
     * @remarks
     * - Appends component to the end of the form
     * - Maintains component order
     * - Preserves component configuration
     */
    addElement(state, action: PayloadAction<BuilderComponent>) {
      state.elements.push(action.payload);
    },

    /**
     * Removes an element from the form
     * @param state - Current form state
     * @param action - Index of the element to remove
     *
     * @remarks
     * - Removes component at specified index
     * - Maintains array structure
     * - Updates element positions
     */
    removeElement(state, action: PayloadAction<number>) {
      state.elements.splice(action.payload, 1);
    },
  },
});

export const { addElement, removeElement } = formSlice.actions;
export default formSlice.reducer;
