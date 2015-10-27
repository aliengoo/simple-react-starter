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
        loader: 'eslint-loader'
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
  devServer: {
    contentBase: "./wwwroot"
  },
  resolve: {
    extensions: ['', '.js']
  },
  watch: true
};