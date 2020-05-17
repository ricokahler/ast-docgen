import fs from 'fs';
import ts from 'typescript';
import createRoot from './createRoot';
import ofKind from './ofKind';
import query from './query';
import find from './find';

it('recursively finds the correct token', async () => {
  const content = (
    await fs.promises.readFile(require.resolve('./find.example'))
  ).toString();

  const rootNode = createRoot(content);
  const literal = query(rootNode, find(ofKind(ts.SyntaxKind.StringLiteral)))!;

  expect(literal.getText()).toMatchInlineSnapshot(`"'test string'"`);
});
