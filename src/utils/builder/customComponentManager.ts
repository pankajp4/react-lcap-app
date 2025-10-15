import type { BaseComponent } from "../../store/builder/types";

export interface TemplateVersion {
  version: number;
  components: BaseComponent[];
  updatedAt: string;
  notes?: string;
}

export interface CustomTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  components: BaseComponent[];
  versions: TemplateVersion[];
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "ui-builder-templates";

class CustomComponentManager {
  private templates: CustomTemplate[] = [];

  constructor() {
    this.loadTemplates();
  }

  private loadTemplates() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.templates = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load templates:", error);
      this.templates = [];
    }
  }

  private saveTemplates() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.templates));
    } catch (error) {
      console.error("Failed to save templates:", error);
    }
  }

  getTemplates(): CustomTemplate[] {
    return [...this.templates];
  }

  getTemplate(id: string): CustomTemplate | undefined {
    return this.templates.find((t) => t.id === id);
  }

  saveTemplate(
    name: string,
    description: string,
    components: BaseComponent[],
    category: string = "Uncategorized",
    tags: string[] = []
  ): CustomTemplate {
    const now = new Date().toISOString();
    const template: CustomTemplate = {
      id: `template-${Date.now()}`,
      name,
      description,
      category,
      tags,
      components,
      versions: [
        {
          version: 1,
          components,
          updatedAt: now,
        },
      ],
      currentVersion: 1,
      createdAt: now,
      updatedAt: now,
    };

    this.templates.push(template);
    this.saveTemplates();
    return template;
  }

  updateTemplateVersion(
    id: string,
    components: BaseComponent[],
    notes?: string
  ): CustomTemplate | null {
    const template = this.templates.find((t) => t.id === id);
    if (!template) return null;

    const newVersion = template.currentVersion + 1;
    template.versions.push({
      version: newVersion,
      components,
      updatedAt: new Date().toISOString(),
      notes,
    });
    template.currentVersion = newVersion;
    template.components = components;
    template.updatedAt = new Date().toISOString();

    this.saveTemplates();
    return template;
  }

  getTemplateVersion(id: string, version: number): TemplateVersion | null {
    const template = this.templates.find((t) => t.id === id);
    if (!template) return null;

    return template.versions.find((v) => v.version === version) || null;
  }

  revertToVersion(id: string, version: number): CustomTemplate | null {
    const template = this.templates.find((t) => t.id === id);
    if (!template) return null;

    const targetVersion = template.versions.find((v) => v.version === version);
    if (!targetVersion) return null;

    template.components = targetVersion.components;
    template.currentVersion = version;
    template.updatedAt = new Date().toISOString();

    this.saveTemplates();
    return template;
  }

  exportTemplates(templateIds?: string[]): string {
    const templatesForExport = templateIds
      ? this.templates.filter((t) => templateIds.includes(t.id))
      : this.templates;

    return JSON.stringify(templatesForExport);
  }

  importTemplates(jsonData: string): { imported: number; errors: number } {
    try {
      const importedTemplates = JSON.parse(jsonData) as CustomTemplate[];
      let imported = 0;
      let errors = 0;

      importedTemplates.forEach((template) => {
        try {
          // Validate template structure
          if (
            template.id &&
            template.name &&
            template.components &&
            template.versions &&
            template.currentVersion
          ) {
            // Check for duplicate IDs
            const existingTemplate = this.templates.find(
              (t) => t.id === template.id
            );
            if (existingTemplate) {
              template.id = `template-${Date.now()}-${imported}`;
            }

            this.templates.push(template);
            imported++;
          } else {
            errors++;
          }
        } catch {
          errors++;
        }
      });

      this.saveTemplates();
      return { imported, errors };
    } catch {
      return { imported: 0, errors: 1 };
    }
  }

  updateTemplate(
    id: string,
    updates: Partial<CustomTemplate>
  ): CustomTemplate | null {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const template = this.templates[index];
    const updatedTemplate = {
      ...template,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.templates[index] = updatedTemplate;
    this.saveTemplates();
    return updatedTemplate;
  }

  deleteTemplate(id: string): boolean {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.templates.splice(index, 1);
    this.saveTemplates();
    return true;
  }
}

export default new CustomComponentManager();
