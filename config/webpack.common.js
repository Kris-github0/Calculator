module.exports = {
  entry: { index: "./src/index.js" },
  output: { assetModuleFilename: "favicon/[name][ext]" },
  module: {
    rules: [
      {
        test: /\.(png|xml|ico|svg|webmanifest)/,
        type: "asset/resource",
      },
    ],
  },
};
