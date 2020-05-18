import ts from 'typescript';

/**
 * Creates the root node aka the SourceFile node given some code
 */
function createRoot(content: string) {
  return ts.createSourceFile(
    'example.d.ts',
    content,
    ts.ScriptTarget.ESNext,
    true,
  );
}

export default createRoot;
