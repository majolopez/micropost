const path = require('path');

module.exports = {
  entry: './src/app.js',
  mode: 'development',


  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node-modules/,
      }
    ]
  }
};