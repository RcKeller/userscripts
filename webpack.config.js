/*
(WEBPACK) BABEL LOADER
Transpiles ES7 code from /src to cross-compatible scripts in /lib
Requires manual updates to [entry] for new userscripts
`npm run build` to run this.
*/
var input = __dirname + "/src"
var output = __dirname + "/scripts"
module.exports = {
  //  FORMAT: Destination : Source
  entry: {
    'waitForKeyElements': './src/util/waitForKeyElements.js',
    'addGlobalStyle': './src/util/addGlobalStyle.js',
    'puppet-enhancement-suite': './src/devops/puppet-enhancement-suite.js'
  },
  output: {
    path: output,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test:  /\.js$/,
        include: input,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
