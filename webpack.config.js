var path = require('path');

module.exports = {
  entry: path.resolve('./app'),
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  devServer: {
    port: 8080,
    hot: true,
    // inline: true,
    // contentBase: '/'
  }
}