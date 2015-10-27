module.exports = {

  entry: [
    './src/main.js'
  ],
  output: {
    filename: './wwwroot/bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'jshint-loader'
      }
    ],

    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },

  jshint: {
    esnext: true
  },
  resolve: {
    extensions: ['', '.js']
  },
  watch: true
};