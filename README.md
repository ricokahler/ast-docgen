# `ast-docgen`

> A toolkit for generating docs from typescript ASTs

extremely experimental as of now. check back later

```
npm i --save-dev @ricokahler/ast-docgen
```

<!-- START_DOCGEN -->

### `adjacent`

grabs using adjacent criteria

- `acceptSubject: (node: ts.Node) => boolean`
- `acceptObject: (node: ts.Node) => node is T`

**Return type:** `(node: any) => T`

### `allAdjacent`

similar to adjacent but grabs all of them

- `acceptSubject: (node: ts.Node) => boolean`
- `acceptObject: (node: ts.Node) => node is T`

**Return type:** `(node: any) => T[]`

### `allChildren`

like children but grabs all of them that match in the level

- `accept: (node: ts.Node) => node is T`

**Return type:** `(node: any) => any`

### `allSiblings`

like siblings but grabs all the siblings that match in the label

- `acceptSubject: (node: ts.Node) => boolean`
- `acceptObject: (node: ts.Node) => node is T`

**Return type:** `(node: any) => T[]`

### `and`

requires that all accept or this will return false

- `...accepts: Array<(node: ts.Node) => any>`

**Return type:** `(node: any) => boolean`

### `child`

in the current level (i.e. this is not recursive), this will return the first
matching node

- `accept: (node: ts.Node) => node is T`

**Return type:** `(node: any) => T`

### `compileDeclarations`

takes in a all the file names and returns the declaration for each file.
use this to normalize the type files before pulling data from them

- `filenames: string[]`
- `compilerOptions?: ts.CompilerOptions`

**Return type:** `string[]`

### `createRoot`

creates the root node aka the SourceFile node

- `content: string`

**Return type:** `any`

### `find`

recursively looks for a node that satisfies the accept function

- `accept: (node: ts.Node) => node is T`

**Return type:** `(node: ts.Node) => T | null`

### `findAll`

like find but doesn't early return. returns an array of accepted nodes

- `accept: any`

**Return type:** `(node: ts.Node) => ts.Node[]`

### `ofKind`

returns an acceptor that takes in a syntax kind. this file exists for
convenience and types

- `syntaxKind: S`

**Return type:** `(node: any) => node is NodeTypes[S]`

### `or`

returns true is at least one of the acceptors returns true

- `...accepts: Array<(node: ts.Node) => any>`

**Return type:** `(node: any) => boolean`

### `query`

A simple function that applies the second argument (the function) to the
first argument (the input node).

- `node: ts.Node`
- `fn: (t: ts.Node) => T`

**Return type:** `T`

### `sibling`

referencing the first matching subject, this selector will looks the first
matching sibling (the `object`)

- `acceptSubject: (node: ts.Node) => boolean`
- `acceptObject: (node: ts.Node) => node is T`

**Return type:** `(node: any) => T`
