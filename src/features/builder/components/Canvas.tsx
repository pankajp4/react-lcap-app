import React from "react";
import styled from "@emotion/styled";
import { componentRegistry } from "../componentRegistry";
import type { BaseComponent } from "../types";

const CanvasContainer = styled.div`
  min-height: 100%;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DropIndicator = styled.div<{ isOver?: boolean }>`
  border: 2px dashed ${(props) => (props.isOver ? "#4299e1" : "#e2e8f0")};
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  color: ${(props) => (props.isOver ? "#4299e1" : "#718096")};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  transition: all 0.2s;
`;

const ComponentWrapper = styled.div<{ isSelected?: boolean }>`
  position: relative;
  border: 2px solid ${(props) => (props.isSelected ? "#4299e1" : "transparent")};
  border-radius: 4px;
  margin: 0.5rem;
  min-height: 50px;

  &:hover {
    border-color: #4299e1;
  }
`;

const ComponentPreview = styled.div`
  padding: 1rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #fc8181;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  opacity: 0;

  ${ComponentWrapper}:hover & {
    opacity: 1;
  }
`;

interface CanvasProps {
  components: BaseComponent[];
  selectedId: string | null;
  onComponentDrop: (component: BaseComponent, parentId?: string) => void;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  selectedId,
  onComponentDrop,
  onSelectComponent,
  onDeleteComponent,
}) => {
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent, id?: string) => {
    e.preventDefault();
    setDragOverId(id || "root");
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, parentId?: string) => {
    e.preventDefault();
    setDragOverId(null);

    const componentData = e.dataTransfer.getData("component");
    if (componentData) {
      const component = JSON.parse(componentData);
      onComponentDrop(component, parentId);
    }
  };

  const renderComponent = (component: BaseComponent) => {
    const componentDef = componentRegistry
      .flatMap((group) => group.components)
      .find((c) => c.type === component.type);

    if (!componentDef) return null;

    const canHaveChildren = componentDef.allowedChildren?.length;

    return (
      <ComponentWrapper
        key={component.id}
        isSelected={selectedId === component.id}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent(component.id);
        }}
      >
        <ComponentPreview>
          {component.name}
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              onDeleteComponent(component.id);
            }}
          >
            ✕
          </DeleteButton>
        </ComponentPreview>
        {canHaveChildren && (
          <DropIndicator
            isOver={dragOverId === component.id}
            onDragOver={(e) => handleDragOver(e, component.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, component.id)}
          >
            {component.children?.map((child) => renderComponent(child))}
            {(!component.children || component.children.length === 0) &&
              "Drop components here"}
          </DropIndicator>
        )}
      </ComponentWrapper>
    );
  };

  return (
    <CanvasContainer
      onClick={() => onSelectComponent("")}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e)}
    >
      {components.length > 0 ? (
        components.map((component) => renderComponent(component))
      ) : (
        <DropIndicator isOver={dragOverId === "root"}>
          Drag and drop components here
        </DropIndicator>
      )}
    </CanvasContainer>
  );
};

export default Canvas;
