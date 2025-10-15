/**
 * @module Hooks
 * @description
 * Custom React hooks for API call management with loading and notification states.
 * @category Utils
 */

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@store/loading/loadingSlice";
import { showNotification } from "@store/notification/notificationSlice";

/**
 * Configuration options for the useApiCall hook
 * @interface
 * @category API
 * @since 1.0.0
 *
 * @remarks
 * Controls the behavior of loading states and notifications:
 * - Loading state management with unique keys
 * - Success/error message customization
 * - Notification display configuration
 *
 * @example
 * ```typescript
 * const options: UseApiCallOptions = {
 *   loadingKey: 'save-form',
 *   successMessage: 'Form saved successfully',
 *   errorMessage: 'Failed to save form'
 * };
 * ```
 */
interface UseApiCallOptions {
  /**
   * Unique identifier for the loading state.
   * Used to track loading status in Redux store.
   */
  loadingKey: string;

  /**
   * Message to show on successful API call.
   * If not provided, no success notification is shown.
   */
  successMessage?: string;

  /**
   * Message to show on API call failure.
   * Falls back to error.message if not provided.
   */
  errorMessage?: string;
}

/**
 * Hook for managing API calls with automatic loading and notification handling
 * @template T - The type of data returned by the API call
 * @category Hooks
 * @since 1.0.0
 *
 * @remarks
 * This hook provides:
 * - Automatic loading state management
 * - Success/error notifications
 * - Error handling
 * - TypeScript support
 * - Redux integration
 *
 * The hook automatically:
 * 1. Sets loading state on API call start
 * 2. Handles success/error notifications
 * 3. Cleans up loading state on completion
 * 4. Provides type-safe error handling
 *
 * @example
 * ```typescript
 * // Basic usage
 * const saveForm = useApiCall({
 *   loadingKey: 'save-form',
 *   successMessage: 'Form saved successfully'
 * });
 *
 * // Using the hook
 * const handleSave = async () => {
 *   try {
 *     await saveForm(
 *       () => api.saveForm(formData),
 *       (result) => console.log('Saved:', result),
 *       (error) => console.error('Save failed:', error)
 *     );
 *   } catch (error) {
 *     // Handle error
 *   }
 * };
 * ```
 *
 * @returns A callback function that executes the API call with loading and notification handling
 */
export function useApiCall<T>({
  loadingKey,
  successMessage,
  errorMessage,
}: UseApiCallOptions) {
  const dispatch = useDispatch();

  /**
   * Executes an API call with loading and notification handling
   * @param apiCall - The async function to execute
   * @param onSuccess - Optional callback for successful execution
   * @param onError - Optional callback for error handling
   * @returns Promise resolving to the API call result
   * @throws {Error} Rethrows any error from the API call
   *
   * @remarks
   * The execute function:
   * 1. Sets loading state true
   * 2. Executes the API call
   * 3. Shows success/error notifications
   * 4. Calls appropriate callbacks
   * 5. Sets loading state false
   * 6. Returns or throws
   */
  const execute = useCallback(
    async (
      apiCall: () => Promise<T>,
      onSuccess?: (result: T) => void,
      onError?: (error: Error) => void
    ) => {
      try {
        dispatch(setLoading({ key: loadingKey, isLoading: true }));
        const result = await apiCall();

        if (successMessage) {
          dispatch(
            showNotification({
              message: successMessage,
              severity: "success",
            })
          );
        }

        onSuccess?.(result);
        return result;
      } catch (error) {
        const errorMsg =
          errorMessage ||
          (error instanceof Error ? error.message : "An error occurred");

        dispatch(
          showNotification({
            message: errorMsg,
            severity: "error",
          })
        );

        if (error instanceof Error) {
          onError?.(error);
        }

        throw error;
      } finally {
        dispatch(setLoading({ key: loadingKey, isLoading: false }));
      }
    },
    [dispatch, loadingKey, successMessage, errorMessage]
  );

  return execute;
}
