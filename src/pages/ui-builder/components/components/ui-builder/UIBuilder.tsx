/**
 * @fileoverview
 * Main UIBuilder component.
 * Orchestrates all UI builder functionality including component management,
 * preview, template saving, and code export.
 *
 * @module Pages/UIBuilder/Components/UIBuilder
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import ComponentList from "../component-list";
import Canvas from "../canvas";
import PropertiesPanel from "../properties-panel";
import PreviewWindow from "../preview-window";
import SaveTemplateDialog from "../save-template-dialog";
import { TopBar, Button, ButtonGroup } from "../shared";
import type { BaseComponent } from "../../../../../store/builder/types";
import type { CustomTemplate } from "../../../../../utils/builder/customComponentManager";
import { exportToCode } from "../../../../../utils/builder/codeExporter";
import HistoryManager from "../../../../../utils/builder/historyManager";

const UIBuilder: React.FC = () => {
  const [components, setComponents] = React.useState<BaseComponent[]>([]);
  const [selectedComponent, setSelectedComponent] =
    React.useState<BaseComponent | null>(null);
  const [isPreviewMode, setIsPreviewMode] = React.useState(false);
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = React.useState(false);
  // Template editing is now handled by the template manager
  const [,] = React.useState<CustomTemplate | null>(null);
  const historyManager = React.useRef(new HistoryManager());
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const saveToHistory = React.useCallback(() => {
    historyManager.current.push({
      components,
      selectedId: selectedComponent?.id || null,
    });
  }, [components, selectedComponent]);

  const handleUndo = React.useCallback(() => {
    const previousState = historyManager.current.undo();
    if (previousState) {
      setComponents(previousState.components);
      setSelectedComponent(
        previousState.selectedId
          ? previousState.components.find(
              (c) => c.id === previousState.selectedId
            ) || null
          : null
      );
    }
  }, []);

  const handleRedo = React.useCallback(() => {
    const nextState = historyManager.current.redo();
    if (nextState) {
      setComponents(nextState.components);
      setSelectedComponent(
        nextState.selectedId
          ? nextState.components.find((c) => c.id === nextState.selectedId) ||
              null
          : null
      );
    }
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleComponentDrop = (component: BaseComponent, parentId?: string) => {
    let newComponents: BaseComponent[];

    if (!parentId) {
      newComponents = [...components, component];
    } else {
      const updateChildren = (items: BaseComponent[]): BaseComponent[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), component],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateChildren(item.children),
            };
          }
          return item;
        });
      };
      newComponents = updateChildren(components);
    }

    setComponents(newComponents);
    saveToHistory();
  };

  const handlePropertyChange = (property: string, value: any) => {
    if (!selectedComponent) return;

    const updateComponent = (items: BaseComponent[]): BaseComponent[] => {
      return items.map((item) => {
        if (item.id === selectedComponent.id) {
          return {
            ...item,
            props: {
              ...item.props,
              [property]: value,
            },
          };
        }
        if (item.children) {
          return {
            ...item,
            children: updateComponent(item.children),
          };
        }
        return item;
      });
    };

    const updatedComponents = updateComponent(components);
    setComponents(updatedComponents);

    // Update selected component
    const findUpdated = (items: BaseComponent[]): BaseComponent | null => {
      for (const item of items) {
        if (item.id === selectedComponent.id) {
          return item;
        }
        if (item.children) {
          const found = findUpdated(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const updatedSelected = findUpdated(updatedComponents);
    if (updatedSelected) {
      setSelectedComponent(updatedSelected);
      saveToHistory();
    }
  };

  const handleDeleteComponent = (id: string) => {
    const deleteComponent = (items: BaseComponent[]): BaseComponent[] => {
      return items.filter((item) => {
        if (item.id === id) {
          return false;
        }
        if (item.children) {
          return {
            ...item,
            children: deleteComponent(item.children),
          };
        }
        return true;
      });
    };

    const newComponents = deleteComponent(components);
    setComponents(newComponents);
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
    saveToHistory();
  };

  const handleExport = () => {
    try {
      const code = exportToCode(components);
      // Here you could either download the file or show it in a modal
      console.log(code);
      // For now, we'll copy it to the clipboard
      navigator.clipboard.writeText(code);
    } catch (error) {
      console.error("Failed to export code:", error);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all components?")) {
      setComponents([]);
      setSelectedComponent(null);
      historyManager.current.clear();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f7f8fa",
        overflow: "hidden",
      }}
    >
      <TopBar>
        <Typography variant="h5" component="h1" sx={{ color: "#ffffff" }}>
          UI Builder
        </Typography>
        <ButtonGroup>
          <Button
            onClick={handleUndo}
            disabled={!historyManager.current.canUndo()}
            title="Undo (Ctrl+Z)"
          >
            Undo
          </Button>
          <Button
            onClick={handleRedo}
            disabled={!historyManager.current.canRedo()}
            title="Redo (Ctrl+Shift+Z)"
          >
            Redo
          </Button>
          <Button
            onClick={() => setIsPreviewMode(true)}
            disabled={components.length === 0}
          >
            Preview
          </Button>
          <Button
            onClick={() => setIsSaveTemplateOpen(true)}
            disabled={components.length === 0}
          >
            Save as Template
          </Button>
          <Button onClick={handleExport} disabled={components.length === 0}>
            Export Code
          </Button>
          <Button onClick={handleClear} disabled={components.length === 0}>
            Clear Canvas
          </Button>
        </ButtonGroup>
      </TopBar>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "280px",
            backgroundColor: "#2c3e50",
            color: "#ffffff",
            padding: "20px 16px",
            overflowY: "auto",
            borderRight: "1px solid rgba(0, 0, 0, 0.2)",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(0, 0, 0, 0.2)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "3px",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.4)",
              },
            },
          }}
        >
          <ComponentList
            onEditTemplate={(template: CustomTemplate) => {
              setComponents(template.components);
              setSelectedComponent(null);
              historyManager.current.clear();
              historyManager.current.push({
                components: template.components,
                selectedId: null,
              });
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "24px",
            overflow: "auto",
            backgroundColor: "#f7f8fa",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#e2e8f0",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#cbd5e0",
              borderRadius: "5px",
              "&:hover": {
                background: "#a0aec0",
              },
            },
          }}
        >
          <Canvas
            components={components}
            selectedId={selectedComponent?.id || null}
            onComponentDrop={handleComponentDrop}
            onSelectComponent={(id) => {
              const findComponent = (
                items: BaseComponent[]
              ): BaseComponent | null => {
                for (const item of items) {
                  if (item.id === id) {
                    return item;
                  }
                  if (item.children) {
                    const found = findComponent(item.children);
                    if (found) return found;
                  }
                }
                return null;
              };

              setSelectedComponent(id ? findComponent(components) : null);
            }}
            onDeleteComponent={handleDeleteComponent}
          />
        </Box>
        <Box
          sx={{
            width: "320px",
            backgroundColor: "#ffffff",
            borderLeft: "1px solid #e2e8f0",
            padding: "20px",
            overflowY: "auto",
            boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.05)",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f7f8fa",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#cbd5e0",
              borderRadius: "3px",
              "&:hover": {
                background: "#a0aec0",
              },
            },
          }}
        >
          <PropertiesPanel
            selectedComponent={selectedComponent}
            onPropertyChange={handlePropertyChange}
          />
        </Box>
      </Box>
      <PreviewWindow
        isOpen={isPreviewMode}
        onClose={() => setIsPreviewMode(false)}
        components={components}
      />
      <SaveTemplateDialog
        open={isSaveTemplateOpen}
        onClose={() => setIsSaveTemplateOpen(false)}
        components={components}
        onSave={() => {
          setIsSaveTemplateOpen(false);
          // Force ComponentList to refresh its templates
          forceUpdate();
        }}
      />
    </Box>
  );
};

export default UIBuilder;
