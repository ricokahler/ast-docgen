import fs from 'fs';
import ts from 'typescript';
import adjacent from './adjacent';
import createRoot from './createRoot';
import query from './query';
import find from './find';
import ofKind from './ofKind';

it('finds the adjacent node to a subject node given a root node', async () => {
  const contents = `(() => {
    function testThing() {
        return (test: string, next: number) => {};
      }
    })();
  `;

  const root = createRoot(contents);

  const result = query(
    root,
    find(
      // find the node where there is a comma token followed by a parameter
      adjacent(
        ofKind(ts.SyntaxKind.CommaToken),
        ofKind(ts.SyntaxKind.Parameter),
      ),
    ),
  )!;

  expect(result.getText()).toMatchInlineSnapshot(
    `"test: string, next: number"`,
  );
});
