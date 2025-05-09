import resolve from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternalPlugin from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");


export default [
  {
    input: "src/main.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternalPlugin(),
      resolve(),
      commonJs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser()
    ],
    external: ["react", "rect-dom"]
  },
  {
    input: "src/main.ts",
    output: [{ file: packageJson.types }],
    plugins: [
      dts.default()
    ]
  }
]