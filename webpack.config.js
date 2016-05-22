var path = require('path')


module.exports = {

    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000',
        'webpack/hot/dev-server',
        './src/main.js'
    ],

    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: 'http://0.0.0.0:8000/static'
    },

    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
      },
    },


    module: {
        loaders: [
            {
                test: /\.js$/ ,
                exclude: /node_modules/,
                loaders: ['react-hot','babel?presets[]=es2015,presets[]=react']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
        ]
    }

}
