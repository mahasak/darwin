import * as bodyParser  from 'body-parser';
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

app.use( bodyParser.json() ); 

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }))


applyRoutes(routes, app);

if (isDevelopment) {
    app.get("/index", (req: express.Request, res: express.Response): void => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'server', 'public', 'index.html'));
    });

    app.get("/login", (req: express.Request, res: express.Response): void => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'server', 'public', 'login.html'));
    });
} else {
    app.get("/login", (req: express.Request, res: express.Response): void => {
        res.sendFile(path.resolve(__dirname, 'public', 'login.html'));
    });
}


applyMiddleware(errorHandlers, app);

app.listen(port, () => {
    console.log(`Server started on port: ${port}, environment: ${process.env.NODE_ENV}, Development: ${isDevelopment}`);
});

async function start() {

}