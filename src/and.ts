import ts from 'typescript';

/**
 * requires that all accept or this will return false
 */
function and(...accepts: Array<(node: ts.Node) => any>) {
  return (node: ts.Node) => accepts.every((accept) => Boolean(accept(node)));
}

export default and;
