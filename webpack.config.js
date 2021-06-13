const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: "./dist",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Comfy House'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./public", to: "./public" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-regenerator", '@babel/plugin-transform-runtime']

                    }
                }

            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    }
};