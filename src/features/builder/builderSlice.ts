/**
 * @module Features/Builder
 * @description
 * Redux slice for managing the form builder's state, including forms,
 * components, selection, and UI state.
 * @category State Management
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  BuilderComponent,
  FormConfig,
  ComponentConfig,
} from "../../types/builder";

/**
 * Interface defining the form builder's state structure
 * @interface
 * @category State
 * @since 1.0.0
 *
 * @remarks
 * The builder state manages several aspects of the form builder:
 * - Form collection and active form tracking
 * - Component selection and manipulation
 * - Drag and drop operations
 * - Clipboard operations
 * - Save state tracking
 * - Available component registry
 */
interface BuilderState {
  /** Collection of all forms in the builder */
  forms: FormConfig[];
  /** ID of the currently active form being edited */
  activeFormId: string | null;
  /** ID of the currently selected component */
  selectedComponentId: string | null;
  /** Flag indicating if a drag operation is in progress */
  isDragging: boolean;
  /** Currently copied/cut component data */
  clipboard: BuilderComponent | null;
  /** Flag indicating if a form save operation is in progress */
  formSaving: boolean;
  /** Registry of components that can be added to forms */
  availableComponents: ComponentConfig[];
}

/**
 * Initial state for the builder slice
 * @constant
 * @category State
 *
 * @remarks
 * Sets up the default state with:
 * - Empty forms array
 * - No active form
 * - No selected component
 * - No drag operation
 * - Empty clipboard
 * - No save operation
 * - Empty component registry
 */
const initialState: BuilderState = {
  forms: [],
  activeFormId: null,
  selectedComponentId: null,
  isDragging: false,
  clipboard: null,
  formSaving: false,
  availableComponents: [],
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<FormConfig[]>) => {
      state.forms = action.payload;
    },
    addForm: (state, action: PayloadAction<FormConfig>) => {
      state.forms.push(action.payload);
    },
    updateForm: (state, action: PayloadAction<FormConfig>) => {
      const index = state.forms.findIndex(
        (form) => form.id === action.payload.id
      );
      if (index !== -1) {
        state.forms[index] = action.payload;
      }
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter((form) => form.id !== action.payload);
    },
    setActiveForm: (state, action: PayloadAction<string>) => {
      state.activeFormId = action.payload;
    },
    addComponent: (
      state,
      action: PayloadAction<{ formId: string; component: BuilderComponent }>
    ) => {
      const form = state.forms.find((f) => f.id === action.payload.formId);
      if (form) {
        form.components.push(action.payload.component);
      }
    },
    deleteComponent: (
      state,
      action: PayloadAction<{ formId: string; componentId: string }>
    ) => {
      const form = state.forms.find((f) => f.id === action.payload.formId);
      if (form) {
        form.components = form.components.filter(
          (c) => c.id !== action.payload.componentId
        );
      }
    },
    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponentId = action.payload;
    },
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    copyComponent: (state, action: PayloadAction<BuilderComponent>) => {
      state.clipboard = action.payload;
    },
    clearClipboard: (state) => {
      state.clipboard = null;
    },
    saveForm: (state, _action: PayloadAction<{ formId: string }>) => {
      state.formSaving = true;
    },
    saveFormSuccess: (state) => {
      state.formSaving = false;
    },
    saveFormFailure: (state) => {
      state.formSaving = false;
    },
    updateComponent: (
      state,
      action: PayloadAction<{
        formId: string;
        componentId: string;
        updates: Partial<BuilderComponent>;
      }>
    ) => {
      const form = state.forms.find((f) => f.id === action.payload.formId);
      if (form) {
        const component = form.components.find(
          (c) => c.id === action.payload.componentId
        );
        if (component) {
          Object.assign(component, action.payload.updates);
        }
      }
    },
  },
});

export const {
  setForms,
  addForm,
  updateForm,
  deleteForm,
  setActiveForm,
  addComponent,
  updateComponent,
  deleteComponent,
  setSelectedComponent,
  setIsDragging,
  copyComponent,
  clearClipboard,
  saveForm,
  saveFormSuccess,
  saveFormFailure,
} = builderSlice.actions;

export default builderSlice.reducer;
