import * as express from 'express';
import * as webpackConfig from '../../webpack.config';

export default function wds(app: express.Application) {
    const compiler = require('webpack')(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

