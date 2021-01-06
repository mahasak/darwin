import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import { redisClient } from '../config/cache';

const getAsync = promisify(redisClient.get).bind(redisClient);

const getFromCache = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
        let query = req.query.q as string;
        let data = await getAsync(query);

        if (data) {
            console.log("Cache hit")
            res.status(200).send(data);
        } else {
            console.log("Cache not hit")
            next();
        }
};

export { getFromCache };