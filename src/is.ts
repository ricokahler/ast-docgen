import ts from 'typescript';

type TypeOfTs = typeof ts;
type NodeTypeGuard<T extends ts.Node> = (node: ts.Node) => node is T;
type NodeType = {
  [K in keyof TypeOfTs]: TypeOfTs[K] extends NodeTypeGuard<infer U>
    ? U
    : ts.Node;
}[keyof TypeOfTs];

type _NodeTypes = {
  [K in NodeType['kind']]: Extract<NodeType, { kind: K }>;
};
type NodeTypes = {
  [K in keyof _NodeTypes]: _NodeTypes[K] extends never
    ? ts.Node
    : _NodeTypes[K];
};

/**
 * returns an acceptor that takes in a syntax kind. this file exists for
 * convenience and types
 */
function is<S extends ts.SyntaxKind>(syntaxKind: S) {
  return (node: ts.Node): node is NodeTypes[S] => node.kind === syntaxKind;
}

export default is;
