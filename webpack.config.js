const path = require("path");

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "inline-source_map"
};

module.exports = config;
