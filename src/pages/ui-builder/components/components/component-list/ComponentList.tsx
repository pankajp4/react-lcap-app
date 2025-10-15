/**
 * @fileoverview
 * ComponentList component for the UI Builder.
 * Displays a searchable, categorized list of available components.
 *
 * @module Pages/UIBuilder/Components/ComponentList
 * @category UIBuilder
 * @since 1.0.0
 */

import React from "react";
import { componentRegistry } from "../../../../../utils/builder/componentRegistry";
import type { BaseComponent } from "../../../../../store/builder/types";
import type { CustomTemplate } from "../../../../../utils/builder/customComponentManager";
import styles from "./ComponentList.module.css";

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
    <div className={styles.container}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search components..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredRegistry.map((group) => (
        <div key={group.name} className={styles.componentGroup}>
          <h3 className={styles.groupTitle}>{group.name}</h3>
          {group.components.map((component) => (
            <div
              key={component.type}
              className={styles.componentItem}
              draggable
              role="button"
              tabIndex={0}
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComponentList;
