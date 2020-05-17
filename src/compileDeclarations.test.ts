import compileDeclarations from './compileDeclarations';

it('works', () => {
  const result = compileDeclarations([
    require.resolve('./compileDeclarations.example'),
  ]);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "/**
     * This is  a test function used for testing
     */
    declare function myFunction(x: number): string;
    ",
    ]
  `);
});
