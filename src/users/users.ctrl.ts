import { envelope } from '../helpers/envelope'
import { Handlers } from '../helpers/handlers'
import UsersServices from './users.service'
import { Request, Response } from 'express'

export class UsersContr {
    public  static usersfind = async (req: Request, res: Response) => {
        const id_user = req.params.id_user;
        try {
            const response = await UsersServices.usersfind(id_user);
            const resData = Handlers.dataHandler(response, "GET");
            res.status(resData.code).json(envelope(resData.data));
        } catch (error) {
            const resError = Handlers.errorHandler({ error: error.message }, "BAD_REQUEST");
            res.status(resError.code).json(envelope(resError.data));
        }
    }
    public static usersadd = async (req: Request, res: Response)  => {
        const user = req.body;
        try {
            const response = await UsersServices.usersadd(user);
            const resData = Handlers.dataHandler(response, 'POST')
            console.log(resData)
            res.status(resData.code).json(envelope(resData.data))
        } catch (error) {
            const resError = Handlers.errorHandler({ error: error.message }, "BAD_REQUEST");
            res.status(resError.code).json(envelope(resError.data));
        }
    }
    public static login = async (req: Request, res: Response)  => {
        const user = req.body;
        try {
            const response = await UsersServices.login(user);
            const resData = Handlers.dataHandler(response, 'POST')
            console.log(resData)
            res.status(resData.code).json(envelope(resData.data))
        } catch (error) {
            const resError = Handlers.errorHandler({ error: error.message }, "BAD_REQUEST");
            res.status(resError.code).json(envelope(resError.data));
        }
    }
}
