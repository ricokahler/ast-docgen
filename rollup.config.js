import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.ts'];

export default {
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
      babelHelpers: 'bundled',
      extensions,
    }),
  ],
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'umd',
    sourcemap: true,
    name: 'astDocgen',
    globals: {
      typescript: 'ts',
    },
  },
  external: ['typescript'],
};
