import type { Configuration } from "webpack";
import * as path from "path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    index: "./src/main/main.ts",
    preload: "./src/main/preload.ts",
  },
  output: {
    filename: "[name].js", // 使用入口名作为文件名
    path: path.resolve(__dirname, ".webpack/main"),
  },
  // 添加 node 配置
  node: {
    __dirname: false,
    __filename: false,
  },
  target: "electron-main", // 确保正确的目标环境
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
