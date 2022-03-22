const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');(非推奨)
const CssMinimizePlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      // new OptimizeCSSAssetsPlugin({}),(非推奨)
      // ↑の代わりにCssMinimizePluginを使う(推奨)
      new CssMinimizePlugin(),
    ],
  },
});