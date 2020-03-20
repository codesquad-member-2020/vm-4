const path = require("path");

const ENTRY_FILE = path.resolve(__dirname, "init.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "bundle.js"
  }
};

module.exports = config;
