import ts from 'typescript';
import { Accept } from './types';

/**
 * recursively looks for a node that satisfies the accept function
 */
function find<T extends ts.Node>(accept: Accept<T>) {
  return function* (node: ts.Node): Generator<T> {
    if (accept(node)) yield node;

    for (const child of node.getChildren()) {
      const found = find(accept)(child);
      for (const i of found) {
        yield i;
      }
    }
  };
}

export default find;
