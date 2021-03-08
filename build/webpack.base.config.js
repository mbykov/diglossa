const path = require("path");
const nodeExternals = require("webpack-node-externals");

const translateEnvToMode = (env) => {
  if (env === "production") {
    return "production";
  }
  return "development";
};

module.exports = env => {
  return {
    target: "electron-renderer",
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        // {
        //   test: /\.worker\.js$/,
        //   type: 'app',
        //   loader: "worker-loader",
        //   options: {
        //     publicPath: "/app",
        //   },
        // },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
          // use: ["worker-loader", "babel-loader"]
        },
        // {
        //   test: /\.worker\.js$/,
        //   // loader: 'file-loader',
        //   // options: {
        //   //   publicPath: 'app',
        //   // },

        //   // use: { loader: "worker-loader" },
        //   type: 'app',
        //   loader: "worker-loader",
        //   options: {
        //     publicPath: "/app",
        //   //   // node_modules/pdf-extraction/lib/pdf.js/v1.10.100/build/pdf.worker.js
        //   //   // filename: 'kuku.js',
        //   },
        // },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          // use: [
          //   { loader: 'style-loader' },
            // { loader: 'css-loader' },
          //   { loader: "postcss-loader" },
          // ],
          // use: ["style-loader", "css-loader", "postcss-loader"],
          use: ["style-loader", "css-loader"],
        }
      ]
    },
    // "plugins": ["transform-object-rest-spread"],
    plugins: [
    ]
  };
};
