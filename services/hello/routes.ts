import { Request, Response, NextFunction } from 'express';
import { hello } from './HelloController';

export default [
    {
        path: '/api/v1/hello',
        method: 'get',
        handler: [
            async ({ query }: Request, res: Response) => {
                const result = await hello(query.q as string);
                res.status(200).send(result);
            },

        ],
    }]