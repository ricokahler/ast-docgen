import ts from 'typescript';

/**
 * takes in a all the file names and returns the declaration for each file.
 * use this to normalize the type files before pulling data from them
 */
function compileDeclarations(
  filenames: string[],
  compilerOptions?: ts.CompilerOptions,
) {
  const compilerOptionsWithDeclaration: ts.CompilerOptions = {
    ...compilerOptions,
    declaration: true,
    emitDeclarationOnly: true,
  };

  const host = ts.createCompilerHost(compilerOptionsWithDeclaration);
  const compiled: { [filename: string]: string } = {};
  host.writeFile = (filename, content) => {
    if (!filename.endsWith('.d.ts')) {
      throw new Error(
        'Expected filename to end in .d.ts. This may be a bug in ast-docgen',
      );
    }

    compiled[filename.replace(/\.d\.ts$/i, '')] = content;
  };

  const program = ts.createProgram(
    filenames,
    compilerOptionsWithDeclaration,
    host,
  );
  program.emit();

  for (const filename of filenames) {
    host.readFile(filename);
  }

  const compiledFilenames = filenames
    .map((filename) => filename.replace(/\.(t|j)sx?$/i, ''))
    .map((filename) => {
      const compiledResult = compiled[filename];

      if (compiledResult === undefined) {
        throw new Error(
          `Could not get declaration for "${filename}". This may be a bug in ast-docgen.`,
        );
      }

      return compiledResult;
    });

  return compiledFilenames;
}

export default compileDeclarations;
