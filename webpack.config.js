require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        front: './assets/front.js',
        admin: './assets/admin.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: "js/[name].js",
        publicPath: "build",
        clean: true,
    },

    module: {
        rules: [
            // rules css files
            {
                test: /\.css$/i,
                use: [
                    {
// style-loader for css in head
// MiniCssExtractPlugin for css in a same name file
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            //rules images files
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/ressource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },

            //babel config
            {
                test: /\.js$/i,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },

    plugins: [].concat([new MiniCssExtractPlugin({
        filename: "css/[name].css"
    })]),
};