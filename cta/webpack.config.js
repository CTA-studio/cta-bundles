const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "cta-app.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  devtool: false,
  optimization: {
    sideEffects: true,
    usedExports: true,
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};


