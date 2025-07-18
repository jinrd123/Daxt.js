const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const config = require("./webpack.base.js");

const serverConfig = {
  // target: "node", // 打包后输出再node环境下运行的代码
  externalsPresets: { node: true },
  mode: "development",
  entry: "./src/server/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  externals: [nodeExternals()], // 以忽略节点\模块文件夹中的所有模块
};

module.exports = merge(config, serverConfig);
