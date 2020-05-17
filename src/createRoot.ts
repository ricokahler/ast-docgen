import ts from 'typescript';

/**
 * creates the root node aka the SourceFile node
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
