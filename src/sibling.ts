import ts from 'typescript';
import { Accept } from './types';

/**
 * referencing the first matching subject, this selector will looks the first
 * matching sibling (the `object`)
 */
function sibling<T extends ts.Node>(accept: Accept<T>) {
  return function* (node: ts.Node) {
    const children = node.parent.getChildren();
    const currentIndex = children.findIndex((child) => child === node);

    for (let i = currentIndex + 1; i < children.length; i += 1) {
      const sibling = children[i];
      if (accept(sibling)) yield sibling;
    }
  };
}

export default sibling;
