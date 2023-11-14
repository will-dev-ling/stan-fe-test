const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "app.js", // Output file for JavaScript
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // This will prevent the creation of the LICENSE.txt file
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader", // Use Babel loader
            options: {
              presets: [
                "@babel/preset-env", // Preset to compile your JavaScript to ES5
                "@babel/preset-react", // Preset to compile React JSX to JavaScript
                "@babel/preset-typescript", // Preset to compile TypeScript
              ],
            },
          },
        ],
        exclude: [/node_modules/, /\.test\.tsx?$/, /\.spec\.tsx?$/],
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract styles to a separate file
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "logo.svg", // This will output your SVG as "logo.svg"
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
      inject: "body", // This will inject your bundle at the bottom of the body tag
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output file for styles
    }),
  ],
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".css",
      ".scss",
      ".png",
      ".svg",
    ],
    modules: ["src", "node_modules"], // Assuming that your files are inside the src dir
  },
};
