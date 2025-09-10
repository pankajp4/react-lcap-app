import type {
  ISaveService,
  IPreviewService,
  IPublishService,
} from "./interfaces";
import type { FormConfig } from "../types/builder";

export class FormService
  implements ISaveService, IPreviewService, IPublishService
{
  private readonly apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async saveForm(form: FormConfig): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/forms/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to save form");
    }
  }

  async generatePreview(form: FormConfig): Promise<string> {
    const response = await fetch(`${this.apiBaseUrl}/forms/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to generate preview");
    }

    const { previewUrl } = await response.json();
    return previewUrl;
  }

  async publishForm(form: FormConfig): Promise<void> {
    const response = await fetch(
      `${this.apiBaseUrl}/forms/${form.id}/publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to publish form");
    }
  }
}
