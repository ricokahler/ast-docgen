import ts from 'typescript';

function createRoot(content: string) {
  return ts.createSourceFile(
    'example.d.ts',
    content,
    ts.ScriptTarget.ESNext,
    true,
  );
}

export default createRoot;
