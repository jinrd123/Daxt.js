const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  // target: "node", // 打包后输出再node环境下运行的代码
  externalsPresets: { node: true },
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  externals: [nodeExternals()], // 以忽略节点\模块文件夹中的所有模块
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            [
              "env",
              {
                targets: {
                  browsers: ["last 2 versions"], // 处理后的代码兼容主流浏览器最新的两个版本
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
