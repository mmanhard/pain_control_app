const path = require('path');

module.exports = {
  mode: "development",
  watch: true,
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
        use: [
          'file-loader',
        ],
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  }
};