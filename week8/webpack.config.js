const path = require('path');
const devServer = require('webpack-dev-server');


module.exports = {
    entry: './main.js',
    output: {
        filename: 'mian.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [['@babel/plugin-transform-react-jsx', {"pragma": "createElement"}]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    'css-loader'
                ]
            }
        ]
    },
    mode: 'development',
    devServer: {
        contentBase: './build',
        host: 'localhost',
        port: '3000',
        open: true,
    }
}