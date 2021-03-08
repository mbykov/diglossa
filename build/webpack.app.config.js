const path = require("path");
const base = require("./webpack.base.config");
const { merge } = require('webpack-merge');

module.exports = env => {
  return merge(base(env), {
    entry: {
      background: "./src/background.js",
      popup: "./src/popup.js",
      app: "./src/app.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../app")
    }
  });
};
