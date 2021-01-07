import { Request, Response } from 'express';

export default [
  {
    path: '/dashboard',
    method: 'get',
    handler: [
      (req: Request, res: Response) => {
        const user = { name: 'World' };
        console.log('TypeScript + Node = ❤')
        res.render('dashboard/index',{ user })
      },
    ],
  }
];