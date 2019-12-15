const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('pixrem')({
            atrules: true,
        }),
        require('cssnano'),
    ],
};