const path = require('path');
const themeAssetsPath = '../web/wp-content/themes/empty-theme/dist';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = (env, options) => {
    console.log('options', options);
    const isDevelopment = options.mode === 'development' || options.mode === 'dev' || options.mode === 'watch';
    console.log('isDevelopment', isDevelopment);
    return {
        entry: './src/js/app.js',
        output: {
            filename: 'js/app.js',
            path: path.resolve(__dirname, themeAssetsPath)
        },
        devtool: isDevelopment ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevelopment,
                            },
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevelopment,
                            },
                        },]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/,
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
            new MiniCssExtractPlugin({
                filename: `css/[name].css`
            }),
            new ImageminPlugin({
                disable: isDevelopment, // Disable during development
                test: /\.(jpe?g|png|gif)$/i,
                pngquant: {
                    quality: '95-100'
                }
            })
        ]
    }
};