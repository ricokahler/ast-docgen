import ts from 'typescript';

function find(accept: any): (node: ts.Node) => ts.Node | null;
function find<T extends ts.Node>(
  accept: (node: ts.Node) => node is T,
): (node: ts.Node) => T | null {
  return (node: ts.Node): T | null => {
    if (accept(node)) return node;

    for (const child of node.getChildren()) {
      const found = find(accept)(child);
      if (found) return found as T;
    }

    return null;
  };
}

export default find;
