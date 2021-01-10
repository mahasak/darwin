import * as express from 'express';
import { applyRoutes } from './utils';
import routes from './services';
import * as path from 'path';
const port = process.env.PORT || 5000

if (typeof process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'production';
}
//import wds from './wds'
import wds from './wds'
const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

if (isDevelopment) {
    //const wds = require('./wds');
    wds(app);
} else {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

applyRoutes(routes, app);

app.get("/", (req: express.Request, res: express.Response): void => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}, environment: ${process.env.NODE_ENV}, Development: ${isDevelopment}`);
});