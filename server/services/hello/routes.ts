import { Request, Response, NextFunction } from 'express';
import { hello, world } from './HelloController';

export default [
    {
        path: '/api/v1/hello',
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                const result = await hello();
                res.status(200).send(result);
            },

        ],
    },
    {
        path: '/api/v1/world',
        method: 'post',
        handler: [
            async ( req: Request, res: Response) => {
                console.log(req)
                const result = await world(req.body.msg as string);
                res.status(200).send(result);
            },

        ],
    }]