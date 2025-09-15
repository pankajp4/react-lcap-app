import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  BuilderComponent,
  FormConfig,
  ComponentConfig,
} from "../../types/builder";

interface BuilderState {
  forms: FormConfig[];
  activeFormId: string | null;
  selectedComponentId: string | null;
  isDragging: boolean;
  clipboard: BuilderComponent | null;
  formSaving: boolean;
  availableComponents: ComponentConfig[];
}

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
    saveForm: (state, action: PayloadAction<{ formId: string }>) => {
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
