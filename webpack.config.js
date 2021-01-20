const path = require('path')
const webpack = require('webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    browser: './src/browser.ts',
    'service-worker': './src/service-worker.ts',
    'assets-js': './src/assets/javascript/index.js',
    'assets-css': './src/assets/stylesheets/index.scss'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            },
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets-css.css'
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|assets/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true
      }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG_SW': JSON.stringify(true),
    }),
  ],
}
