const path = require('path');

module.exports = {
  entry: './src/main.js', // punto di partenza, il file principale che importa gli altri
  output: {
    path: path.resolve(__dirname, 'dist'), // directory di output
    filename: 'bundle.min.js',// nome del file di output minimizzato
  },
  mode: 'production', // minimizzazione automatica
  module: {
    rules: [
      {
        test: /\.js$/i, // per tutti i file js
        exclude: /node_modules/, // escludi node_modules
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};