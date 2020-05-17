import ts from 'typescript';

/**
 * returns true is at least one of the acceptors returns true
 */
function or(...accepts: Array<(node: ts.Node) => any>) {
  return (node: ts.Node) => accepts.some((accept) => Boolean(accept(node)));
}

export default or;
