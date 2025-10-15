/**
 * @module Features
 * @description
 * Central Redux store configuration that combines all feature reducers
 * and sets up middleware for state management.
 * @category Store
 */

import { configureStore } from "@reduxjs/toolkit";

/**
 * Feature reducers import block
 * @internal
 *
 * @remarks
 * - formReducer: Handles form data and submission state
 * - builderReducer: Manages form builder UI state
 * - historyReducer: Controls undo/redo functionality
 * - notificationReducer: Manages global notifications
 * - loadingReducer: Tracks loading states
 */
import formReducer from "@store/form/formSlice";
import builderReducer from "@store/builder/builderSlice";
import historyReducer from "@store/builder/historySlice";
import notificationReducer from "@store/notification/notificationSlice";
import loadingReducer from "@store/loading/loadingSlice";

/**
 * Configure and create the Redux store with all feature reducers
 * @public
 * @since 1.0.0
 *
 * @remarks
 * The store configuration includes:
 * - Combined feature reducers
 * - Custom middleware setup
 * - Serialization configuration
 * - Development tools integration
 *
 * State Structure:
 * - form: Form data and submission state
 * - builder: Form builder UI and component state
 * - history: Undo/redo history stack
 * - notification: Global notification queue
 * - loading: Application loading states
 *
 * @example
 * ```typescript
 * // Using the store in a component
 * import { useSelector, useDispatch } from 'react-redux';
 * import type { RootState } from './store';
 *
 * function MyComponent() {
 *   const formState = useSelector((state: RootState) => state.form);
 *   const dispatch = useDispatch();
 *   // ... component logic
 * }
 * ```
 */
const store = configureStore({
  /**
   * Combined reducers for different features
   */
  reducer: {
    /** Form state management */
    form: formReducer,
    /** UI Builder state */
    builder: builderReducer,
    /** Undo/Redo history */
    history: historyReducer,
    /** Global notifications */
    notification: notificationReducer,
    /** Loading states */
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "builder/setForms",
          "builder/addForm",
          "builder/updateForm",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
