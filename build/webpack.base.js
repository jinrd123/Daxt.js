module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // 处理项目中的CSS文件（启用CSS Modules）
      {
        test: /\.css$/,
        exclude: /node_modules/,
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
            },
          },
        ],
      },
      // 处理node_modules中的CSS文件（不启用CSS Modules）
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
        ],
      },
      // 处理项目中的less文件（启用CSS Modules）
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
              esModule: false,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 处理node_modules中的less文件（主要是Antd，不启用CSS Modules）
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              esModule: false,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
};
