const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CSPWebpackPlugin = require('csp-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
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

let cspConfig = {
    enabled: true,
    policy: {
        'base-uri': "'self'",
        'object-src': "'none'",
        'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
        'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
    },
    hashEnabled: {
        'script-src': false,
        'style-src': false
    },
    nonceEnabled: {
        'script-src': false,
        'style-src': false
    },
};

module.exports = {
    mode: 'development',
    entry: {
        app: [path.resolve(__dirname, 'client', 'App.tsx'), 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    devServer: {
        historyApiFallback: { disableDotRule: true }
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'server', 'public'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss', '.css']
    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        }
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
            cspConfig: cspConfig,
            template: path.resolve(__dirname, 'client', 'templates', 'master.html'),
            filename: 'index.html',
            chunks: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client', 'templates', 'login.html'),
            filename: 'login.html',
            chunks: ['app', 'vendor']
        }),
        new CspHtmlWebpackPlugin({
            'base-uri': "'self'",
            'object-src': "'none'",
            'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
            'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
        }, {
            enabled: true,
            hashingMethod: 'sha256',
            hashEnabled: {
                'script-src': true,
                'style-src': true
            },
            nonceEnabled: {
                'script-src': true,
                'style-src': true
            },
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}