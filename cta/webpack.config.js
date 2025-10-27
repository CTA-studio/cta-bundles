const path = require("path");

module.exports = {
  entry: [
    "./src/cta-map.js",
    "./src/cta-core.js",
    "./src/functions.js",
    "./src/cta-form.js",
    "./src/cta-cookie.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // ✅ Pulisce la cartella dist prima del build
  },
  mode: "production", // ✅ Abilita ottimizzazioni automatiche
  devtool: false, // ✅ Nessuna mappa sorgente per alleggerire il bundle
  optimization: {
    sideEffects: true,   // ✅ Consente il tree-shaking, senza rischi
    usedExports: true,   // ✅ Elimina codice non utilizzato
    minimize: true,      // ✅ Minifica esplicitamente (già attivo in production)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};


