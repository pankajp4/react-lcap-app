import React from "react";
import styled from "@emotion/styled";
import { componentRegistry } from "../componentRegistry";
import type { BaseComponent } from "../types";
import type { CustomTemplate } from "../customComponentManager";

const ComponentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #2d3748;
  border-radius: 4px;
  background-color: #2d3748;
  color: white;
  &::placeholder {
    color: #a0aec0;
  }
`;

const ComponentGroup = styled.div`
  margin-bottom: 1rem;
`;

const GroupTitle = styled.h3`
  font-size: 0.875rem;
  color: #a0aec0;
  margin-bottom: 0.5rem;
`;

const ComponentItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #2d3748;
  }
`;

interface ComponentListProps {
  onEditTemplate?: (template: CustomTemplate) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({
  onEditTemplate: _onEditTemplate,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleDragStart = (e: React.DragEvent, component: BaseComponent) => {
    const componentData: BaseComponent = {
      id: `${component.type}-${Date.now()}`,
      type: component.type,
      name: component.name,
      props: { ...component.props },
      children: [],
    };
    e.dataTransfer.setData("component", JSON.stringify(componentData));
  };

  const filteredRegistry = React.useMemo(() => {
    if (!searchTerm) return componentRegistry;

    return componentRegistry
      .map((group) => ({
        ...group,
        components: group.components.filter((component) =>
          component.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.components.length > 0);
  }, [searchTerm]);

  return (
    <ComponentListContainer>
      <SearchInput
        type="text"
        placeholder="Search components..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredRegistry.map((group) => (
        <ComponentGroup key={group.name}>
          <GroupTitle>{group.name}</GroupTitle>
          {group.components.map((component) => (
            <ComponentItem
              key={component.type}
              draggable
              onDragStart={(e) =>
                handleDragStart(e, {
                  id: "",
                  type: component.type,
                  name: component.name,
                  props: component.defaultProps,
                })
              }
            >
              {component.name}
            </ComponentItem>
          ))}
        </ComponentGroup>
      ))}
    </ComponentListContainer>
  );
};

export default ComponentList;
