const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            {test: /\.vue$/, use: 'vue-loader'},
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
