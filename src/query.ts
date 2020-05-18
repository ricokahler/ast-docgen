import ts from 'typescript';
import queryAll from './queryAll';
import { Operation } from './types';

/**
 * Applies an array of generators to the node and pulls the first node
 */
function query<T extends ts.Node>(node: ts.Node, o1: Operation<T>): T | null;
function query<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation<T>,
): T | null;
function query<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation,
  o3: Operation<T>,
): T | null;
function query<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation,
  o3: Operation,
  o4: Operation<T>,
): T | null;
function query<T extends ts.Node>(
  node: ts.Node,
  o1: Operation,
  o2: Operation,
  o3: Operation,
  o4: Operation,
  o5: Operation<T>,
): T | null;
function query<T extends ts.Node>(
  node: ts.Node,
  ...fns: Operation[]
): T | null {
  // ts doesn't like the spread here
  // @ts-ignore
  for (const i of queryAll(node, ...fns)) {
    return i as T;
  }
  return null;
}

export default query;
