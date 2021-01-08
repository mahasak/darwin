const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

let HWPConfig = new HtmlWebpackPlugin({
    template: __dirname + "/index.html",
    file: "index.html",
    inject: "body"
})

let articles = ['sass-react', 'chart-js', 'copy-right', 'object-literal', 'spread-operator'];

let multiplesFiles = articles.map(function (entryName) {
    return new HtmlWebpackPlugin({
        filename: entryName + '.html',
        template: __dirname + `/articles/{entryName}.html`
    })
})

module.exports = {
    mode: 'development',
    entry: {
        app: [path.resolve(__dirname, 'src', 'client', 'App.tsx'), 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'server', 'public'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'src', 'client', 'templates', 'master.html'), 
            filename: 'index.html', 
            chunks: ['app', 'vendor'] 
        }),
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'src', 'client', 'templates', 'login.html'), 
            filename: 'login.html', 
            chunks: ['app', 'vendor'] 
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}