import type { FormConfig } from "../types/builder";

export interface ISaveService {
  saveForm(form: FormConfig): Promise<void>;
}

export interface IPreviewService {
  generatePreview(form: FormConfig): Promise<string>; // Returns preview URL
}

export interface IPublishService {
  publishForm(form: FormConfig): Promise<void>;
}

export interface IHistoryService {
  canUndo(): boolean;
  canRedo(): boolean;
  undo(): void;
  redo(): void;
}
