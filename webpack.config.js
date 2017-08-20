var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: [
        __dirname + '/src/appEntry.js',
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
    ],
    output:{
         //输出路径
        path: path.join(__dirname, 'dist'),
        //输出文件名
        filename:"bundle.js",
        // publicPath: 'http://localhost:3000/static/'
    },
    // plugins: [
        // new webpack.HotModuleReplacementPlugin()
    // ],
    target: 'electron',
    module: {
        rules: [
          {
            test: /\.(less|css)$/,
            use:[ 'style-loader','css-loader','less-loader'],
          },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react', 'stage-1']
                }
            }
        ]
  }
};