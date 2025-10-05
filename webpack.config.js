const path = require('path');

module.exports = {
  entry: './client/canvas.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
     directory: path.join(__dirname, 'dist'),
    },    
    compress: true,
    port: 3000,
  },
};