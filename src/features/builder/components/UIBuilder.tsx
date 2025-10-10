import React from "react";
import styled from "@emotion/styled";
import ComponentList from "./ComponentList";
import Canvas from "./canvas/Canvas";
import PropertiesPanel from "./PropertiesPanel";
import PreviewWindow from "./PreviewWindow";
import SaveTemplateDialog from "./SaveTemplateDialog";
import { TopBar, Button, ButtonGroup } from "./styles";
import type { BaseComponent } from "../types";
import type { CustomTemplate } from "../customComponentManager";
import { exportToCode } from "../codeExporter";
import HistoryManager from "../HistoryManager";

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f5f6f7;
`;

const EditorContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ComponentPanel = styled.div`
  width: 250px;
  background-color: #1a202c;
  color: white;
  padding: 1rem;
  overflow-y: auto;
`;

const CanvasContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow: auto;
`;

const PropertiesPanelContainer = styled.div`
  width: 300px;
  background-color: white;
  border-left: 1px solid #e2e8f0;
  padding: 1rem;
  overflow-y: auto;
`;

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
    <BuilderContainer>
      <TopBar>
        <h1>UI Builder</h1>
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
      <EditorContainer>
        <ComponentPanel>
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
        </ComponentPanel>
        <CanvasContainer>
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
        </CanvasContainer>
        <PropertiesPanelContainer>
          <PropertiesPanel
            selectedComponent={selectedComponent}
            onPropertyChange={handlePropertyChange}
          />
        </PropertiesPanelContainer>
      </EditorContainer>
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
    </BuilderContainer>
  );
};

export default UIBuilder;
