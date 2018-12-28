const path = require('path');
const autoprefixer = require('autoprefixer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
  entry: path.join(PATHS.SRC, 'index.js'),
  
  output: {
    path: PATHS.DIST,
    filename: 'app.bundle.js',
    publicPath: "/"
  },
  
  devtool: "eval-source-map",
  
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              discardDuplicates: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [ autoprefixer ],
              options: {
                sourceMap: false,
              },
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|ttf|eot|gif|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [ ".js", ".jsx" ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.SRC, 'index.html')
    }),
    new ProgressBarPlugin(),
  ],
  
  devServer: {
    port: 8008,
    historyApiFallback: true
  },
};