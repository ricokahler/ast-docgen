# `ast-docgen`

> A toolkit for generating docs from typescript ASTs

⚠️ extremely experimental as of now. check back later

```
npm i --save-dev @ricokahler/ast-docgen
```

And yes, [these docs were generated from itself](https://github.com/ricokahler/ast-docgen/blob/master/scripts/generate-docs/generate-docs.ts).

---

<!-- START_DOCGEN -->

### `adjacent`

Grabs the adjacent node to the given node

- `acceptObject: Accept<T>`

**Return type:** `(node: any) => Generator<T, void, unknown>`

### `and`

Return an acceptor that requires all of the given acceptors to accept

- `...accepts: Accept[]`

**Return type:** `(node: any) => boolean`

### `child`

Returns all the nodes in the current level that match the acceptor

- `accept: Accept<T>`

**Return type:** `(node: any) => Generator<T, void, unknown>`

### `compileDeclarations`

Takes in a all the file names and returns the declaration for each file.
Use this to normalize the type files before parsing them for data.

- `filenames: string[]`
- `compilerOptions?: ts.CompilerOptions`

**Return type:** `string[]`

### `createRoot`

Creates the root node aka the SourceFile node given some code

- `content: string`

**Return type:** `any`

### `find`

recursively looks for a node that satisfies the accept function

- `accept: Accept<T>`

**Return type:** `(node: any) => Generator<T>`

### `is`

returns an acceptor that takes in a syntax kind. this file exists for
convenience and types

- `syntaxKind: S`

**Return type:** `(node: any) => node is NodeTypes[S]`

### `or`

returns true is at least one of the acceptors returns true

- `...accepts: Accept[]`

**Return type:** `(node: any) => boolean`

### `query`

Applies an array of generators to the node and pulls the first node

- `node: ts.Node`
- `o1: Operation<T>`

**Return type:** `T | null`

### `queryAll`

Applies all the generators and returns an arry

- `node: ts.Node`
- `...fns: Array<(t: ts.Node) => Generator<ts.Node>>`

**Return type:** `T[]`

### `sibling`

referencing the first matching subject, this selector will looks the first
matching sibling (the `object`)

- `accept: Accept<T>`

**Return type:** `(node: any) => Generator<T, void, unknown>`

### `wildcard`

this is an acceptor that always returns true

**Return type:** `boolean`
