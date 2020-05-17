import ts from 'typescript';

function child<T extends ts.Node>(accept: (node: ts.Node) => node is T) {
  return (node: ts.Node) => {
    for (const child of node.getChildren()) {
      if (accept(child)) return child;
    }

    return null;
  };
}

export default child;
