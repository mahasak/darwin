import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import { applyRoutes, applyMiddleware } from './core';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
const port = process.env.PORT || 5000

if (typeof process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'production';
}

const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))


applyRoutes(routes, app);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client', 'index.html'));
    });
}


applyMiddleware(errorHandlers, app);

app.listen(port, () => {
    console.log(`Server started on port: ${port}, environment: ${process.env.NODE_ENV}, Development: ${isDevelopment}`);
});

async function start() {

}