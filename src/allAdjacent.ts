import ts from 'typescript';

/**
 * similar to adjacent but grabs all of them
 */
function allAdjacent<T extends ts.Node>(
  acceptSubject: (node: ts.Node) => boolean,
  acceptObject: (node: ts.Node) => node is T,
) {
  return (node: ts.Node) => {
    const children = node.getChildren();
    const accepted: T[] = [];

    for (let i = 0; i < children.length - 1; i += 1) {
      const subject = children[i];
      const object = children[i];

      if (acceptSubject(subject) && acceptObject(object)) {
        accepted.push(object);
      }
    }

    return accepted;
  };
}

export default allAdjacent;
