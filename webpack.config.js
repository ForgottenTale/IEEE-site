const HtmlWebPackPlugin = require("html-webpack-plugin");
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  devtool : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true,
                minimize: true
              }
            }
          ]
      }
    ]
  },
  plugins: [new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })],
  output:{
    path: (__dirname +'/build')
  }
};