import ts from 'typescript';
import createRoot from './createRoot';
import find from './find';
import sibling from './sibling';
import adjacent from './adjacent';
import query from './query';
import ofKind from './ofKind';
import and from './and';
import findAll from './findAll';

// todo: write a better description for these jeez
it('returns if there is a matching subject and object that are siblings', () => {
  const contents = `
    function myFunction(param1: string, param2: number) {}
    function anotherFunction(param1: Date, param2: number) {}
  `;

  const root = createRoot(contents);

  const result = query(
    root,
    findAll(
      sibling(
        //
        ofKind(ts.SyntaxKind.Parameter),
        ofKind(ts.SyntaxKind.Parameter),
      ),
    ),
  )!;

  console.log(result.map((x) => x.getText()));
});
