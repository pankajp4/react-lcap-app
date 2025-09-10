import type { IHistoryService } from "./interfaces";
import {
  undo as undoAction,
  redo as redoAction,
} from "../features/builder/historySlice";
import type { AppDispatch, RootState } from "../features/store";

export class HistoryService implements IHistoryService {
  private dispatch: AppDispatch;
  private getState: () => RootState;

  constructor(dispatch: AppDispatch, getState: () => RootState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }

  canUndo(): boolean {
    const state = this.getState();
    return state.history.past.length > 0;
  }

  canRedo(): boolean {
    const state = this.getState();
    return state.history.future.length > 0;
  }

  undo(): void {
    if (this.canUndo()) {
      this.dispatch(undoAction());
    }
  }

  redo(): void {
    if (this.canRedo()) {
      this.dispatch(redoAction());
    }
  }
}
