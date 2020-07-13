const path = require('path');

module.exports = (env) => {
  const isProd = env === 'production';

  return {
    mode: "development",
    watch: !isProd,
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js",
      publicPath: '/'
    },
    resolve: {
      alias: {
        Actions: path.resolve(__dirname, 'src/actions/'),
        API: path.resolve(__dirname, 'src/api/'),
        Common: path.resolve(__dirname, 'src/common/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Navigation: path.resolve(__dirname, 'src/navigation/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
        Reducers: path.resolve(__dirname, 'src/reducers/'),
        Store: path.resolve(__dirname, 'src/store/'),
        Utils: path.resolve(__dirname, 'src/utils/'),
        Icons: path.resolve(__dirname, 'assets/icons/'),
      }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              sourceMap: true
            }
          }
        }
      ]
    },
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
    }
  };
};