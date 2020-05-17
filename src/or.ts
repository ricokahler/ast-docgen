import ts from 'typescript';

function or(...accepts: Array<(node: ts.Node) => any>) {
  return (node: ts.Node) => accepts.some((accept) => Boolean(accept(node)));
}

export default or;
