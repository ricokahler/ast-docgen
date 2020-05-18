import ts from 'typescript';

/**
 * Applies all the generators and returns an arry
 */
function queryAll<T extends ts.Node>(
  node: ts.Node,
  ...fns: Array<(t: ts.Node) => Generator<ts.Node>>
): T[] {
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
