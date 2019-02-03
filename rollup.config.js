import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'es'
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'FontAwesome'
        }
    ],
    external: [
        ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        nodeResolve(),
        commonjs(),
        terser(),
        filesize()
    ]
}
