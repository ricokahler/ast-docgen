import ts from 'typescript';

function adjacent<T extends ts.Node>(
  acceptSubject: (node: ts.Node) => boolean,
  acceptObject: (node: ts.Node) => node is T,
) {
  return (node: ts.Node) => {
    const children = node.getChildren();
    for (let i = 0; i < children.length - 1; i += 1) {
      const subject = children[i];
      const object = children[i + 1];

      if (acceptSubject(subject) && acceptObject(object)) return object;
    }
    return null;
  };
}

export default adjacent;
