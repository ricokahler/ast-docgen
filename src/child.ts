import ts from 'typescript';
import { Accept } from './types';

/**
 * Returns all the nodes in the current level that match the acceptor
 */
function child<T extends ts.Node>(accept: Accept<T>) {
  return function* (node: ts.Node) {
    for (const child of node.getChildren()) {
      if (accept(child)) yield child;
    }
  };
}

export default child;
