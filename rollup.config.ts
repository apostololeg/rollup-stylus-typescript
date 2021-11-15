import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json';

export default {
    input: process.env.INPUT,
    output: [
        {
            exports: 'named',
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            exports: 'named',
            file: pkg.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        postcss({
            // extensions: ['css', '.styl'],
            minimize: true,
            modules: true,
            // use: {
            //     sass: null,
            //     stylus: { javascriptEnabled: true },
            //     less: null
            //     // less: { javascriptEnabled: true }
            // },
            extract: true,
            config: {
                path: './postcss.config.js',
                ctx: null
            }
        }),
        resolve(),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true
        })
    ]
}
