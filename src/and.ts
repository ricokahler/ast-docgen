import ts from 'typescript';
import { Accept } from './types';

/**
 * Return an acceptor that requires all of the given acceptors to accept
 */
function and(...accepts: Accept[]) {
  return (node: ts.Node) => {
    return accepts.every((accept) => Boolean(accept(node)));
  };
}

export default and;
