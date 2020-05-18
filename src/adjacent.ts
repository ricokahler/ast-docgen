import ts from 'typescript';
import { Accept } from './types';

/**
 * Grabs the adjacent node to the given node
 */
function adjacent<T extends ts.Node>(acceptObject: Accept<T>) {
  return function* (node: ts.Node) {
    const children = node.parent.getChildren();
    const currentIndex = children.findIndex((child) => child === node);
    const obj = children[currentIndex + 1];

    if (acceptObject(obj)) yield obj;
  };
}

export default adjacent;
