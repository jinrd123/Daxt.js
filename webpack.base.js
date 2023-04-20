module.exports = {
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
