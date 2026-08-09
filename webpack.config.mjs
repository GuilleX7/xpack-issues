import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @type import('webpack').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/mainEntry",
  },
  plugins: [
    new webpack.library.EnableLibraryPlugin("jsonp"),
    new webpack.EntryPlugin(__dirname, "./src/secondEntry", {
      name: "secondEntry",
      library: {
        type: "jsonp",
        name: "jsonpLoader",
      },
    }),
  ],
  output: {
    clean: true,
    path: path.resolve(__dirname, "webpack-dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};

export default config;
