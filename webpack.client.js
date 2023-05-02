const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.base.js");

const clientConfig = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public"),
  },
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

module.exports = merge(config, clientConfig);
