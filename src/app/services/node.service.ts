import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { Entity, TypeName } from '../models/node.model'

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private _httpClient = inject(HttpClient);
  constructor() { }

  getIcon(typeName: keyof typeof TypeName): string {
    return `pi pi-fw pi-${TypeName[typeName]}`
  };

  formatLabel(children: any[], name: string): string {
    return children.length > 0 ? `${name}s` : name;
  }

  createTreeNode(entity: Entity, children: TreeNode[]): TreeNode {
    const label = children.length > 0 ?`${entity.type.name}s` : entity.type.name;
    const cameraLabel = entity.camera ? entity.camera.name : null;
    const connectionLabel = entity.camera && entity.camera?.connection === true ? 'Connection' :
      entity.camera && entity.camera?.connection === false ? 'No connection' : null;
    return {
      key: entity.id,
      label: label,
      data: {
        ...entity,
        cameraLabel: cameraLabel,
        connectionLabel: connectionLabel,
      },
      icon: this.getIcon(entity.type.name as keyof typeof TypeName),
      children: children
    };
  };


  getNodes(): Observable<{ nodes: TreeNode<Entity>[], types: string[] }> {
    const typesSet: Set<string> = new Set();
    return this._httpClient.get<{ entities: Entity[] }>('http://localhost:3000').pipe(
      map(({ entities }) => {
        // Mapping of parentId to its children
        const groupedEntities: { [parentId: string]: Entity[] } = {};

        entities.forEach((entity: Entity) => {
          const { name } = entity.type;
          const parentId = entity.parentId || ""; // If parentId is null, use an empty string as the key
          groupedEntities[parentId] = groupedEntities[parentId] || [];
          groupedEntities[parentId].push(entity);
          if (name !== 'Sensor') {
            typesSet.add(name);
          }
        });

        // Recursive function to construct tree
        const buildTree = (entities: Entity[]): TreeNode<Entity>[] => {
          return entities.map(entity => {
            const children = buildTree(groupedEntities[entity.id] || []); // Recursively build children
            return this.createTreeNode(entity, children);
          });
        };

        // Find root entities (entities with parentId null)
        const rootEntities = groupedEntities[""];

        // Construct tree
        const nodes: TreeNode<Entity>[] = rootEntities ? rootEntities.map(entity => {
          const children = buildTree(groupedEntities[entity.id] || []); // Start building from root entities
          return this.createTreeNode(entity, children);
        }) : [];

        const types: string[] = Array.from(typesSet);

        return { nodes, types };
      })
    );
  }
  findNodesByTypeName(nodes: TreeNode<Entity>[], typeName: string): TreeNode<Entity>[] {
    const matchingNodes: TreeNode<Entity>[] = [];
  
    const traverseAndCollect = (node: TreeNode<Entity>) => {
      if (node?.data?.type.name === typeName) {
        matchingNodes.push(node);
      }
      if (node.children) {
        node.children.forEach(child => traverseAndCollect(child));
      }
    };
  
    // Traverse the tree to collect nodes matching the specified type name
    nodes.forEach(node => traverseAndCollect(node));
  
    // Filter out nodes on the same level as the requested nodes
    const filteredNodes = matchingNodes.filter(node => {
      const isOnSameLevel = matchingNodes.every(matchingNode => {
        if (node === matchingNode) return true; // Skip comparison with itself
        let current = node.parent;
        while (current) {
          if (current === matchingNode) return false; // Node is on the same level
          current = current.parent;
        }
        return true;
      });
      return isOnSameLevel;
    });
  
    return filteredNodes;
  }
  
}




