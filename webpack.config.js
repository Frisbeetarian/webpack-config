var webpack = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.s[ac]ss$/,
                use: extractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new extractTextPlugin('style.css')
    ]
};

if(inProduction){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}