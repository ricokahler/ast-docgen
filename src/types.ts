import ts from 'typescript';

export type Accept<T extends ts.Node = any> =
  | ((node: ts.Node) => node is T)
  | ((node: ts.Node) => any);

export type Operation<T extends ts.Node = ts.Node> = (
  node: ts.Node,
) => Generator<T>;
