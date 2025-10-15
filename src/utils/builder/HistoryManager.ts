import type { BaseComponent } from "@store/builder/types";

export interface HistoryState {
  components: BaseComponent[];
  selectedId: string | null;
}

class HistoryManager {
  private history: HistoryState[] = [];
  private currentIndex: number = -1;
  private readonly maxHistory: number = 100;

  constructor() {
    this.clear();
  }

  push(state: HistoryState) {
    // Remove any future states if we're not at the end
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // Add new state
    this.history.push(this.cloneState(state));
    this.currentIndex++;

    // Remove oldest states if we exceed maxHistory
    if (this.history.length > this.maxHistory) {
      this.history = this.history.slice(this.history.length - this.maxHistory);
      this.currentIndex = this.history.length - 1;
    }
  }

  undo(): HistoryState | null {
    if (this.currentIndex <= 0) return null;

    this.currentIndex--;
    return this.cloneState(this.history[this.currentIndex]);
  }

  redo(): HistoryState | null {
    if (this.currentIndex >= this.history.length - 1) return null;

    this.currentIndex++;
    return this.cloneState(this.history[this.currentIndex]);
  }

  clear() {
    this.history = [
      {
        components: [],
        selectedId: null,
      },
    ];
    this.currentIndex = 0;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  private cloneState(state: HistoryState): HistoryState {
    return {
      components: JSON.parse(JSON.stringify(state.components)),
      selectedId: state.selectedId,
    };
  }
}

export default HistoryManager;
