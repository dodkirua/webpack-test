const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry : {
        front: './assets/front.js',
        admin: './assets/admin.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/build/js'),
        filename: "[name].js"
    },

    module: {
        rules: [
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
                            import: true,
                            url: true,
                            sourceMap: true,
                        }
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

    plugins: [].concat([new MiniCssExtractPlugin({
            filename: "../css/[name].css"
    })]),
};