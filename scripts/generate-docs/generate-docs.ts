import path from 'path';
import fs from 'fs';
import ts, { SyntaxKind as t } from 'typescript';
import prettier from 'prettier';
import {
  compileDeclarations,
  createRoot,
  query,
  queryAll,
  child,
  is,
  find,
  adjacent,
  wildcard,
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
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const markdown = results
    .map(
      ({ functionName, parameters, description, returnType }) => `
### \`${functionName}\`

${description?.trim()}

${parameters?.map((param) => `- \`${param}\``).join('\n')}

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

  const functionDeclaration = query(root, find(is(t.FunctionDeclaration)));

  if (!functionDeclaration) {
    return null;
  }

  const functionNameIdentifiers = queryAll(
    functionDeclaration,
    child(is(t.FunctionKeyword)),
    adjacent(is(t.Identifier)),
  );
  const [functionNameIdentifier] = functionNameIdentifiers;

  const typeParameterNode = query(
    functionDeclaration,
    child(is(t.LessThanToken)),
    adjacent(is(t.SyntaxList)),
  );

  const paramsSyntaxList = query(
    functionDeclaration,
    child(is(t.OpenParenToken)),
    adjacent(is(t.SyntaxList)),
  );

  const params =
    paramsSyntaxList && queryAll(paramsSyntaxList, child(is(t.Parameter)));

  const returnType = query(
    functionDeclaration,
    child(is(t.ColonToken)),
    adjacent(wildcard),
  );

  const description = query<ts.JSDoc>(
    functionDeclaration,
    child(is(t.JSDocComment)),
  );

  return {
    functionName:
      functionNameIdentifier && functionNameIdentifier.getText().trim(),
    typeParameter: typeParameterNode && typeParameterNode.getText().trim(),
    parameters: params?.map((param) => param.getText().trim()),
    returnType: returnType?.getText().trim(),
    description: description?.comment?.trim(),
  };
}

generateDocs().catch((e) => {
  console.error(e);
  process.exit(1);
});
