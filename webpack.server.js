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
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
              esModule: false,
              // localIdentName: "[name]_[local]_[hash:base64:5]",
            },
          },
        ],
      },
    ],
  },
};

module.exports = merge(config, serverConfig);
