const path = require('path');
const themeAssetsPath = '../web/wp-content/themes/empty-theme/assets';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = (env, options) => {
    const isDevelopment = options.mode === 'development';

    return {
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
                                sassOptions: {
                                    outputStyle: 'compressed',
                                },
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
                                outputPath: './img',
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
                                outputPath: './fonts',
                                name: '[name].[ext]',
                                publicPath: '../fonts'
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
            new CopyWebpackPlugin([
                {from: 'src/img', to: './img'},
                {from: 'src/fonts', to: './fonts'},
            ]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif)$/i,
                cacheFolder: './imgcache',
            })
        ],
    };
}