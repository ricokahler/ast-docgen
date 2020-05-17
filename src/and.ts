import ts from 'typescript';

function and(...accepts: Array<(node: ts.Node) => any>) {
  return (node: ts.Node) => accepts.every((accept) => Boolean(accept(node)));
}

export default and;
