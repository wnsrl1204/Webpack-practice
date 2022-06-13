const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
  const isProd = env.production;
  const PORT = env.port ?? 3000;

  return {
  mode: isProd ? 'production' : 'development',
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './public/index.html')})
  ],
  devServer: {
    port: PORT,
    hot: true,
    static: {
      directory: path.resolve(__dirname, './public'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
  }

}};