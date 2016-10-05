var webpack = require( 'webpack' );

var config = {
    entry: "./src/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.DefinePlugin( {
            MODE: {
                dev: process.env.NODE_ENV === 'development'
            }
        } ),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ],

    devtool: "source-map",
    module: {
        loaders: [
            {
            test: /\.js$/,
                loader: 'babel',
            exclude: /node_modules|bower_components/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader') // eslint-disable-line
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|gif|jpe?g|png)(\?]?.*)?$/,
                loader: 'file-loader?name=res/[name].[ext]?[hash]'
            }
        ]
    }


};

if (process.env.NODE_ENV === 'bs') {
    var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
    config.plugins.push(new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: {baseDir: ['.']}
    }));
}

module.exports = config;