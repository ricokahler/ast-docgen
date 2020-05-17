import ts from 'typescript';

/**
 * like children but grabs all of them that match in the level
 */
function allChildren<T extends ts.Node>(accept: (node: ts.Node) => node is T) {
  return (node: ts.Node) => {
    return node.getChildren().filter(accept);
  };
}

export default allChildren;
