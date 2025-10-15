/**
 * @module Services
 * @description
 * Core service interfaces that define the contract between the form builder
 * application and its backend services. These interfaces ensure consistent
 * implementation of form operations across different service providers.
 * @category Services
 */

import type { FormConfig } from "@/types/builder";

/**
 * Interface for managing form editing history operations
 * @interface
 * @category Services
 * @since 1.0.0
 *
 * @remarks
 * The history service manages undo/redo operations for form editing.
 * Implementations should handle:
 * - State history tracking
 * - Undo/redo state management
 * - History limits and cleanup
 *
 * @example
 * ```typescript
 * class ReduxHistoryService implements IHistoryService {
 *   canUndo(): boolean {
 *     return this.past.length > 0;
 *   }
 *
 *   undo(): void {
 *     if (this.canUndo()) {
 *       // Move current state to future, restore past state
 *     }
 *   }
 * }
 * ```
 */
export interface IHistoryService {
  /**
   * Check if undo operation is available
   * @returns True if undo is available, false otherwise
   *
   * @remarks
   * This method should:
   * - Check if there are past states available
   * - Consider any history limits
   */
  canUndo(): boolean;

  /**
   * Check if redo operation is available
   * @returns True if redo is available, false otherwise
   *
   * @remarks
   * This method should:
   * - Check if there are future states available
   * - Consider any history limits
   */
  canRedo(): boolean;

  /**
   * Perform undo operation
   * @throws {Error} When undo operation fails
   *
   * @remarks
   * This method should:
   * - Restore the previous state
   * - Update the undo/redo stacks
   * - Handle edge cases (e.g., first state)
   */
  undo(): void;

  /**
   * Perform redo operation
   * @throws {Error} When redo operation fails
   *
   * @remarks
   * This method should:
   * - Restore the next state
   * - Update the undo/redo stacks
   * - Handle edge cases (e.g., last state)
   */
  redo(): void;
}

/**
 * Interface for form saving operations
 * @interface
 * @category Services
 * @since 1.0.0
 *
 * @remarks
 * The save service handles persisting form configurations to storage.
 * Implementations should handle:
 * - Data validation
 * - Error handling
 * - Versioning
 * - Conflict resolution
 *
 * @example
 * ```typescript
 * class LocalStorageSaveService implements ISaveService {
 *   async saveForm(form: FormConfig): Promise<void> {
 *     localStorage.setItem(`form-${form.id}`, JSON.stringify(form));
 *   }
 * }
 * ```
 */
export interface ISaveService {
  /**
   * Save a form configuration to storage
   * @param form - The form configuration to save
   * @returns Promise that resolves when save is complete
   * @throws {Error} When save operation fails
   *
   * @remarks
   * This method should:
   * - Validate the form configuration
   * - Handle concurrent saves
   * - Maintain data integrity
   * - Provide error feedback
   */
  saveForm(form: FormConfig): Promise<void>;
}

/**
 * Interface for form preview operations
 * @interface
 * @category Services
 * @since 1.0.0
 *
 * @remarks
 * The preview service generates temporary, viewable versions of forms.
 * Implementations should handle:
 * - Preview environment setup
 * - URL generation
 * - Preview cleanup
 * - Access control
 *
 * @example
 * ```typescript
 * class PreviewService implements IPreviewService {
 *   async generatePreview(form: FormConfig): Promise<string> {
 *     const previewId = await this.createPreviewEnvironment(form);
 *     return `/preview/${previewId}`;
 *   }
 * }
 * ```
 */
export interface IPreviewService {
  /**
   * Generate a preview URL for a form
   * @param form - The form configuration to preview
   * @returns Promise that resolves with the preview URL
   * @throws {Error} When preview generation fails
   *
   * @remarks
   * This method should:
   * - Create a temporary preview environment
   * - Generate a secure access URL
   * - Handle preview expiration
   * - Clean up old previews
   */
  generatePreview(form: FormConfig): Promise<string>;
}

/**
 * Interface for form publishing operations
 * @interface
 * @category Services
 * @since 1.0.0
 *
 * @remarks
 * The publish service handles deploying forms to production.
 * Implementations should handle:
 * - Production deployment
 * - Version management
 * - Access control
 * - Analytics setup
 *
 * @example
 * ```typescript
 * class ProductionPublishService implements IPublishService {
 *   async publishForm(form: FormConfig): Promise<void> {
 *     await this.validateForm(form);
 *     await this.deployToProduction(form);
 *     await this.updateAnalytics(form);
 *   }
 * }
 * ```
 */
export interface IPublishService {
  /**
   * Publish a form configuration to production
   * @param form - The form configuration to publish
   * @returns Promise that resolves when publish is complete
   * @throws {Error} When publish operation fails
   *
   * @remarks
   * This method should:
   * - Validate the form for production
   * - Handle deployment process
   * - Set up monitoring
   * - Manage versions
   */
  publishForm(form: FormConfig): Promise<void>;
}

/**
 * Interface for history management operations
 * @interface
 * @category Services
 */
export interface IHistoryService {
  /**
   * Check if undo operation is available
   * @returns true if undo is available
   */
  canUndo(): boolean;

  /**
   * Check if redo operation is available
   * @returns true if redo is available
   */
  canRedo(): boolean;

  /**
   * Perform undo operation
   */
  undo(): void;

  /**
   * Perform redo operation
   */
  redo(): void;
}
