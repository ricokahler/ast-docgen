import ts from 'typescript';
/**
 * grabs using adjacent criteria
 */
declare function adjacent<T extends ts.Node>(acceptSubject: (node: ts.Node) => boolean, acceptObject: (node: ts.Node) => node is T): (node: any) => T;
export default adjacent;
