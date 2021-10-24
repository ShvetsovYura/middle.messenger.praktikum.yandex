// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prod = process.env.WEBPACK_ENV || process.env.NODE_ENV === 'production';
module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'welcochat.bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/cjs/handlebars',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: [
      {
        context: ['/proxy-api/**'],
        target: 'https://proxy-api/api/',
        pathRewrite: {
          '^/api/': '/',
        },
        secure: false,
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Host', 'my-custom-host');
        },
      },
    ],
    https: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
