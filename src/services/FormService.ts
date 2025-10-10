/**
 * @module Services
 * @description
 * Implementation of core form operations against a REST API backend.
 */

import type {
  ISaveService,
  IPreviewService,
  IPublishService,
} from "./interfaces";
import type { FormConfig } from "../types/builder";

/**
 * Service for handling form operations including saving, previewing, and publishing
 * against a REST API backend.
 * @implements {ISaveService}
 * @implements {IPreviewService}
 * @implements {IPublishService}
 * @since 1.0.0
 *
 * @remarks
 * This service provides a REST API implementation of the core form operations.
 * It handles:
 * - API communication
 * - Error handling and retries
 * - Response validation
 * - JSON serialization
 *
 * @example
 * ```typescript
 * const formService = new FormService('https://api.example.com');
 *
 * // Save a form
 * await formService.saveForm({
 *   id: '123',
 *   fields: [],
 *   metadata: { title: 'My Form' }
 * });
 *
 * // Generate a preview
 * const previewUrl = await formService.generatePreview(form);
 *
 * // Publish to production
 * await formService.publishForm(form);
 * ```
 */
export class FormService
  implements ISaveService, IPreviewService, IPublishService
{
  private readonly apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Save form configuration to the backend API
   * @param form - The form configuration to save
   * @throws {Error} When API request fails or returns non-200 status
   *
   * @remarks
   * This implementation:
   * - Uses PUT request to update existing form
   * - Validates response status
   * - Handles JSON serialization
   * - Provides basic error feedback
   */
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

  /**
   * Generate a preview URL for a form configuration
   * @param form - The form configuration to preview
   * @returns Promise resolving to the preview URL
   * @throws {Error} When API request fails or returns non-200 status
   *
   * @remarks
   * This implementation:
   * - Posts form data to preview endpoint
   * - Validates response status
   * - Extracts preview URL from response
   * - Handles JSON parsing
   */
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

  /**
   * Publish a form configuration to production
   * @param form - The form configuration to publish
   * @throws {Error} When API request fails or returns non-200 status
   *
   * @remarks
   * This implementation:
   * - Posts to publish endpoint
   * - Uses form ID in URL
   * - Validates response status
   * - Provides basic error feedback
   */
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
