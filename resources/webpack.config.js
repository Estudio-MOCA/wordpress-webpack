const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
const themeAssetsPath = '../web/wp-content/themes/empty-theme/assets';
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, themeAssetsPath)
    },
    devtool: isDevelopment ? 'inline-source-map' : '',
    module: {
        rules: [
            //js
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            //css scss
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            //importer: globImporter(),
                        },
                    },
                ],
            },
            //imgs
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './img',
                            name: '[name].[ext]',
                            publicPath: '../img'
                        },
                    },
                ]
            },
            //svg
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath:'../img/svg',
                            name: '[name].[ext]',
                            publicPath: '../img'
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {removeTitle: true},
                                {convertColors: {shorthex: false}},
                                {convertPathData: false},
                            ],
                        },
                    },
                ],
            },
            //fonts
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '../font',
                            name: '[name].[ext]',
                            publicPath: '../img'
                        },
                    },
                ],
            }

        ]
    },
    plugins: [
        require('autoprefixer'),
        require('pixrem'),
        require('cssnano'),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif)$/i,
            cacheFolder: './imgcache',
        })
    ],
};