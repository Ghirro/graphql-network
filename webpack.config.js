var path = require('path');

const sourceReg = /src\//i;
function matchSources(sourcePath) {
  return sourceReg.test(path.relative(__dirname, sourcePath));
}

const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  //include: matchSources,
  exclude: '/node_modules/',
  query: {
    presets: ['react', 'es2015', 'stage-0'],
  },
};

module.exports = {
  entry: {
    panel: './src/panel.js',
    options: './src/options.js'
  },

  postcss: [
    require('postcss-import'),
  ],

  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=[name].[hash].[ext]',
        exclude: /node_modules/,
      },
      babelLoader,
      { test: /\.css$/, loaders: ['style', 'css?module&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'] },
    ],
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },

  devtool: 'cheap-module-source-map',
  debug: true,
};
