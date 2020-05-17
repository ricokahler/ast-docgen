import ts from 'typescript';

/**
 * referencing the first matching subject, this selector will looks the first
 * matching sibling (the `object`)
 */
function sibling<T extends ts.Node>(
  acceptSubject: (node: ts.Node) => boolean,
  acceptObject: (node: ts.Node) => node is T,
) {
  return (node: ts.Node) => {
    const children = node.getChildren();

    for (let i = 0; i < children.length - 1; i += 1) {
      const subject = children[i];
      if (acceptSubject(subject)) {
        for (let j = i + 1; j < children.length; j += 1) {
          const object = children[j];
          if (acceptObject(object)) return object;
        }
      }
    }

    return null;
  };
}

export default sibling;
