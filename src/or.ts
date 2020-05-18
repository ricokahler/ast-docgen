import ts from 'typescript';
import { Accept } from './types';

/**
 * returns true is at least one of the acceptors returns true
 */
function or(...accepts: Accept[]) {
  return (node: ts.Node) => {
    return accepts.some((accept) => Boolean(accept(node)));
  };
}

export default or;
