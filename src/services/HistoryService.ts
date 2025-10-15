import type { IHistoryService } from "@services/interfaces";
import {
  undo as undoAction,
  redo as redoAction,
} from "@store/builder/historySlice";
import type { AppDispatch, RootState } from "@store/store";

/**
 * Service for managing form editing history using Redux
 * @implements {IHistoryService}
 * @since 1.0.0
 *
 * @remarks
 * This service implements undo/redo functionality using Redux for state management.
 * It integrates with:
 * - Redux store for state persistence
 * - History reducer for past/future states
 * - Redux actions for state transitions
 *
 * The service maintains separate past and future stacks in the Redux store,
 * allowing for efficient undo/redo operations without memory issues.
 *
 * @example
 * ```typescript
 * const dispatch = store.dispatch;
 * const getState = store.getState;
 *
 * const historyService = new HistoryService(dispatch, getState);
 *
 * // Check if operations are available
 * if (historyService.canUndo()) {
 *   historyService.undo();
 * }
 *
 * if (historyService.canRedo()) {
 *   historyService.redo();
 * }
 * ```
 */
export class HistoryService implements IHistoryService {
  /** Redux dispatch function for triggering actions */
  private readonly dispatch: AppDispatch;

  /** Function to get current Redux state */
  private readonly getState: () => RootState;

  /**
   * Creates an instance of HistoryService
   * @param dispatch - Redux dispatch function
   * @param getState - Redux state getter function
   */
  constructor(dispatch: AppDispatch, getState: () => RootState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }

  /**
   * Check if undo operation is available
   * @returns True if there are actions that can be undone
   *
   * @remarks
   * Checks the Redux store's history.past array length to determine
   * if there are any previous states available for undo operations.
   */
  canUndo(): boolean {
    const state = this.getState();
    return state.history.past.length > 0;
  }

  /**
   * Check if redo operation is available
   * @returns True if there are actions that can be redone
   *
   * @remarks
   * Checks the Redux store's history.future array length to determine
   * if there are any future states available for redo operations.
   */
  canRedo(): boolean {
    const state = this.getState();
    return state.history.future.length > 0;
  }

  /**
   * Perform undo operation by dispatching undo action
   *
   * @remarks
   * Only dispatches the undo action if canUndo() returns true.
   * The actual state restoration is handled by the Redux reducer.
   */
  undo(): void {
    if (this.canUndo()) {
      this.dispatch(undoAction());
    }
  }

  /**
   * Perform redo operation by dispatching redo action
   *
   * @remarks
   * Only dispatches the redo action if canRedo() returns true.
   * The actual state restoration is handled by the Redux reducer.
   */
  redo(): void {
    if (this.canRedo()) {
      this.dispatch(redoAction());
    }
  }
}
