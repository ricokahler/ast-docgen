import ts from 'typescript';

/**
 * A simple function that applies the second argument (the function) to the
 * first argument (the input node).
 */
function query<T>(node: ts.Node, fn: (t: ts.Node) => T) {
  return fn(node);
}

export default query;
