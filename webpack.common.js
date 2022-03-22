const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js',
    another: './src/js/another.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    // file-loaderの代わりにasset/resourceを使う(推奨)
    assetModuleFilename: 'images/[name].[contenthash].[ext]',
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
        },
        vendorsModules: {
          test: /src[\\/]js[\\/]modules/,
          name: 'vendor-modules',
          minSize: 0,
          minChunks: 2,
        }
      },
    },
  },
  module: {
    rules: [
      //eslint-loaderを使う場合(非推奨)
      //{
      //  enforce: 'pre',
      //  test: /\.js$/,
      //  exclude: /node_modules/,
      //  loader: 'eslint-loader',
      //  options: {
      //    fix: true,
      //  },
      //},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      //file-loaderを使う場合(非推奨)
      //{
      //  test: /\.(jpe?g|gif|png|svg)$/,
      //  loader: 'file-loader',
      //  options: {
      //    name: '[name].[contenthash].[ext]',
      //    outputPath: 'images',
      //    publicPath: '/images',
      //  },
      //},
      //↑の代わりにasset/resourceを使う場合(推奨)
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: "asset/resource",
        loader: 'image-webpack-loader',
        //options: {
        //  mozjpeg: {
        //    quality: 10,
        //  },
        //},
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'],
    }),
    new HTMLWebpackPlugin({
      filename: 'another.html',
      template: './src/html/another.html',
      chunks: ['another'],
    }),
    //eslint-loaderの代わりにeslint-webpack-pluginを使う場合(推奨)
    new ESLintPlugin({
      exclude: 'node_modules',//デフォルト値
      extensions: 'js',//デフォルト値
      fix: true,
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
    }),
  ],
}