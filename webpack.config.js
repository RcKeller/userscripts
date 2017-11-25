var glob = require("glob")

var input = __dirname + "/src"
var output = __dirname + "/lib"
var entry = glob.sync('./src/*.js')
module.exports = {
  /* puppet-enhancement-suite */
  // entry: ['./src/puppet-enhancement-suite.js'],
  // output: {
  //   path: output,
  //   filename: 'puppet-enhancement-suite.js'
  // },
  // entry: './src',
  entry: [
    './src/puppet-enhancement-suite.js',
    // './src/addGlobalStyle.js',
  ],
  output: {
    path: output,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        // test:  /\.js$/,
        test:  /\.js$/,
        include: input,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // query: {
        //   plugins: ['transform-runtime'],
        //   presets: ['env']
        // }
      }
    ]
  }
}
