const path = require("path");

module.exports = {
  entry: {
    "cta-base": "./src/index.js",
    "cta-home": "./src/index-home.js",
    "cta-proposito": "./src/index-proposito.js",
    "cta-projects": "./src/index-projects.js",
    "cta-form": "./src/index-form.js",
  },
  output: {
    filename: "[name].js",
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


