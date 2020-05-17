import ts from 'typescript';

function allChildren<T extends ts.Node>(accept: (node: ts.Node) => node is T) {
  return (node: ts.Node) => {
    return node.getChildren().filter(accept);
  };
}

export default allChildren;
