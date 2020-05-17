import ts from 'typescript';

function allSiblings<T extends ts.Node>(
  acceptSubject: (node: ts.Node) => boolean,
  acceptObject: (node: ts.Node) => node is T,
) {
  return (node: ts.Node) => {
    const children = node.getChildren();
    const accepted: T[] = [];

    for (let i = 0; i < children.length - 1; i += 1) {
      const subject = children[i];
      if (acceptSubject(subject)) {
        for (let j = i + 1; j < children.length; j += 1) {
          const object = children[j];
          if (acceptObject(object)) {
            accepted.push(object);
          }
        }
      }
    }

    return accepted;
  };
}

export default allSiblings;
