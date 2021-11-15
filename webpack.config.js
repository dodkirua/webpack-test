const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry : {
        front: './assets/front.js',
        admin: './assets/admin.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/assets/'),
        filename: "[name]-bundle.js"
    }
}