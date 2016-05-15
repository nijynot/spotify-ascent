const webpack = require('webpack');

const commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    'main.js': ['./views/Main.js'],
  },
  output: {
    path: './public',
    filename: '[name]',
    publicPath: '/',
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json'],
  },
  plugins: [
    commonsPlugin
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./public/vendor.bundle.js")
  ]
};
