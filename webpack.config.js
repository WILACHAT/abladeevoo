const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    entry: './network/src/tester.js',
    output: {
        path: path.resolve(__dirname, 'network', 'src'),
        filename: 'tester.js'
       // publicPath: ''
    },
    module: {
        rules: {
            //test is where you make the thing able to load in js right
            test: /\.js$/,
            use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }

};