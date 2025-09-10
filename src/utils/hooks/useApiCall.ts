import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/loading/loadingSlice";
import { showNotification } from "../../features/notification/notificationSlice";

interface UseApiCallOptions {
  loadingKey: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useApiCall<T>({
  loadingKey,
  successMessage,
  errorMessage,
}: UseApiCallOptions) {
  const dispatch = useDispatch();

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
