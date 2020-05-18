import ts from 'typescript';
import { Operation } from './types';

/**
 * Applies all the generators and returns an arry
 */
function queryAll<T extends ts.Node>(node: ts.Node, o1: Operation<T>): T[];
function queryAll<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation<T>,
): T[];
function queryAll<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation,
  o3: Operation<T>,
): T[];
function queryAll<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation,
  o3: Operation,
  o4: Operation<T>,
): T[];
function queryAll<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation,
  o3: Operation,
  o4: Operation,
  o5: Operation<T>,
): T[];
function queryAll<T extends ts.Node>(node: ts.Node, ...fns: Operation[]): T[] {
  if (!node) return [];

  function* getNode() {
    yield node as ts.Node;
  }

  const accGenerator = fns.reduce((acc, fn) => {
    function* pull() {
      for (const i of acc) {
        for (const j of fn(i)) {
          yield j;
        }
      }
    }

    return pull();
  }, getNode());

  return Array.from(accGenerator) as T[];
}

export default queryAll;
