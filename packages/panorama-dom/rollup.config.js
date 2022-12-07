import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import prettier from 'rollup-plugin-prettier';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const BANNER = `/**
 * React Dom (${pkg.repository})
 * @version ${pkg.version}
 * @license ${pkg.license}
 */`;

/** @returns {import('rollup').RollupOptions} */
const createConfig = (env) => ({
  input: 'src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'esm',
    name: 'ReactDom',
    globals: { react: 'React' },
    banner: BANNER,
  },
  external: ['react', /^@mobilc\/panorama-polyfill/],
  plugins: [
    // https://github.com/rollup/plugins/issues/272
    typescript({ noEmitOnError: false }),
    replace({
      'process.env.BUILD_ENV': JSON.stringify(env),
      // React is using it to choose between development/production builds
      // TODO: Remove once react would use conditional exports
      'process.env.NODE_ENV': JSON.stringify(env),
      // https://github.com/rollup/rollup/issues/3230
      "require('util').inspect": '{}',
      preventAssignment: true
    }),
    commonjs(),
    nodeResolve(),
    env === 'production' && terser(),
  ],
});

/** @type {import('rollup').RollupOptions} */
const dtsConfig = {
  input: 'src/index.ts',
  plugins: [
    dts(),

    // rollup-plugin-dts injects panorama-types reference
    replace({
      delimiters: ['', ''],
      '/// <reference types="@moddota/panorama-types" />\n': '',
      '/// <reference types="@mobilc/panorama-type" />\n': '',
      preventAssignment: true
    }),

    prettier({
      parser: 'typescript',
      tabWidth: 4,
      printWidth: 120,
      singleQuote: false,
    }),
  ],
  output: {
    file: 'dist/index.d.ts',
    outro: 'export as namespace ReactDom;',
  },
};

export default [
  createConfig(process.env.BUILD_ENV),
  dtsConfig,
];
