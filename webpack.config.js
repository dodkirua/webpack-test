require('webpack');
const path = require('path');

module.exports = (env, argv) => {

    const config = argv.mode === 'development' ? devConfig() : prodConfig();

    return {
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

    }

};
/**
 * Development mode configuration
 * @returns {{mode: string, devtool: string, optimization: {minimize: boolean}, module: {rules: [{test: RegExp, use: [string, {loader: string, options: {sourceMap: boolean}}]}, {test: RegExp, generator: {filename: string}, type: string}]}}}
 */
const devConfig = () => {
    return {
        mode: 'development',
        devtool: 'source-map',

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", {loader: "css-loader", options: {sourceMap: true}}],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'assets/ressource',
                    generator: {filename: 'images/[name][ext]'}
                },
            ],
        },
        optimization: {minimize: false},
    }
};

const prodConfig = () => {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    const TerserPlugin = require("terser-webpack-plugin");

    return {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'assets/ressource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                },
                {
                    test: /\.js$/i,
                    loader: 'babel-loader',
                    options: {presets: ['@babel/preset-env'], plugins: ['@babel/plugin-proposal-object-rest-spread']}
                },
            ],
        },

        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin(),],
        },

        plugins: [
            new MiniCssExtractPlugin({filename: "css/[name].css",}),
        ],
    };
};