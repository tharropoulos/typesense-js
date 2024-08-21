/* eslint-disable @typescript-eslint/no-var-requires */

import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config = (env, argv: webpack.Configuration): webpack.Configuration => {
  return {
    entry: "./src/Typesense.ts",
    target: "web",
    mode: argv.mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          mode: "write-dts",
        },
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: `typesense${
        argv && argv.mode === "production" ? ".min" : ""
      }.js`,
      path: path.resolve(__dirname, "dist"),
      library: "Typesense",
    },
    devtool: "source-map",
  };
};

export default config;
