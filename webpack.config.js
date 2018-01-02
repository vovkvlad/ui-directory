const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
    entry: path.join(PATHS.JS, 'index.js'),
    output: {
        path: PATHS.DIST,
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PATHS.SRC, 'index.html')
        })
    ],
    module:{
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ]
            }
        ]
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        extensions: [".js", ".jsx"]
    },

    devServer: {
        contentBase: paths.SRC,
    },
};