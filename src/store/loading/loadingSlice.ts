/**
 * @module Features/Loading
 * @description
 * Redux slice for managing loading states across the application.
 * Provides a flexible, key-based loading state management system.
 * @category State Management
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface defining the loading state structure
 * @interface
 * @category State
 * @since 1.0.0
 *
 * @remarks
 * The loading state uses a dynamic key-value structure where:
 * - Keys are string identifiers for different loading operations
 * - Values are boolean flags indicating loading status
 *
 * This allows:
 * - Multiple concurrent loading states
 * - Granular loading tracking
 * - Component-specific loading states
 * - Feature-specific loading indicators
 *
 * @example
 * ```typescript
 * interface LoadingState {
 *   'form/save': boolean;    // Form save operation
 *   'data/fetch': boolean;   // Data fetching
 *   'auth/login': boolean;   // Authentication
 * }
 * ```
 */
export interface LoadingState {
  [key: string]: boolean;
}

/**
 * Initial state for the loading slice
 * @constant
 * @category State
 *
 * @remarks
 * Starts with an empty object, loading states are added
 * dynamically as needed throughout the application.
 */
const initialState: LoadingState = {};

/**
 * Redux slice for loading state management
 * @constant
 * @category Redux
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * // Set loading state for form save operation
 * dispatch(setLoading({
 *   key: 'form/save',
 *   isLoading: true
 * }));
 *
 * // Clear loading state after operation completes
 * dispatch(setLoading({
 *   key: 'form/save',
 *   isLoading: false
 * }));
 *
 * // Check loading state in a component
 * const isSaving = useSelector(
 *   (state: RootState) => state.loading['form/save']
 * );
 * ```
 */
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    /**
     * Sets the loading state for a specific key
     * @param state - Current loading state
     * @param action - Payload containing key and loading status
     *
     * @remarks
     * - Creates or updates loading state for the specified key
     * - Can handle multiple concurrent loading states
     * - Automatically manages state cleanup
     *
     * @example
     * ```typescript
     * // Start loading
     * dispatch(setLoading({
     *   key: 'data/fetch',
     *   isLoading: true
     * }));
     *
     * // End loading
     * dispatch(setLoading({
     *   key: 'data/fetch',
     *   isLoading: false
     * }));
     * ```
     */
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
