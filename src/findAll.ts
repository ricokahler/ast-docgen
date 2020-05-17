import ts from 'typescript';

function findAll(accept: any): (node: ts.Node) => ts.Node[];
function findAll<T extends ts.Node>(
  accept: (node: ts.Node) => node is T,
): (node: ts.Node) => T[] {
  return (node: ts.Node) => {
    if (accept(node)) return [node];

    return node
      .getChildren()
      .map((child) => findAll(accept)(child))
      .flat() as any[];
  };
}

export default findAll;
