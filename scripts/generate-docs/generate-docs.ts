import path from 'path';
import fs from 'fs';
import ts from 'typescript';
import prettier from 'prettier';
import { stripIndent } from 'common-tags';
import {
  compileDeclarations,
  createRoot,
  query,
  child,
  ofKind,
  find,
  adjacent,
  allChildren,
} from '../../src';

async function generateDocs() {
  const unresolvedFiles = await fs.promises.readdir(
    path.resolve(__dirname, '../../src'),
  );

  const filenames = unresolvedFiles.map((filename) =>
    path.resolve(__dirname, `../../src/${filename}`),
  );

  const declarations = compileDeclarations(filenames);

  const results = declarations
    .map((declaration) => {
      try {
        return getFunctionInfo(declaration);
      } catch (e) {
        console.warn(e);
        return null;
      }
    })
    .filter(Boolean);

  const markdown = results
    .map(
      ({ functionName, parameters, description, returnType }) => `
### \`${functionName}\`

${description.trim()}

${parameters.map((param) => `- \`${param}\``).join('\n')}

**Return type:** \`${returnType}\`
`,
    )
    .join('\n\n');

  const result = prettier.format(markdown, { parser: 'markdown' });

  const readme = (
    await fs.promises.readFile(path.resolve(__dirname, '../../README.md'))
  ).toString();

  const divider = '<!-- START_DOCGEN -->';
  const splitIndex = readme.indexOf(divider) + divider.length;

  const newReadme = `${readme.substring(0, splitIndex)}\n\n${result}`;

  await fs.promises.writeFile(
    path.resolve(__dirname, '../../README.md'),
    newReadme,
  );
}

function getFunctionInfo(contents: string) {
  const root = createRoot(contents);

  const functionDeclaration = query(
    root,
    find(ofKind(ts.SyntaxKind.FunctionDeclaration)),
  );

  const functionNameIdentifier = query(
    functionDeclaration,
    adjacent(
      ofKind(ts.SyntaxKind.FunctionKeyword),
      ofKind(ts.SyntaxKind.Identifier),
    ),
  );

  const typeParameterNode = query(
    functionDeclaration,
    find(ofKind(ts.SyntaxKind.TypeParameter)),
  );

  const paramsSyntaxList = query(
    functionDeclaration,
    adjacent(
      ofKind(ts.SyntaxKind.OpenParenToken),
      ofKind(ts.SyntaxKind.SyntaxList),
    ),
  );

  const params = query(
    paramsSyntaxList,
    allChildren(ofKind(ts.SyntaxKind.Parameter)),
  );

  const returnType = query(
    functionDeclaration,
    adjacent(
      ofKind(ts.SyntaxKind.ColonToken),
      // @ts-ignore
      () => true,
    ),
  );

  const description = query(
    functionDeclaration,
    child(ofKind(ts.SyntaxKind.JSDocComment)),
  );

  return {
    functionName:
      functionNameIdentifier && functionNameIdentifier.getText().trim(),
    typeParameter: typeParameterNode && typeParameterNode.getText().trim(),
    parameters: params.map((param) => param.getText().trim()),
    returnType: returnType && returnType.getText().trim(),
    description: description && description.comment.trim(),
  };
}

generateDocs().catch((e) => {
  console.error(e);
  process.exit(1);
});
