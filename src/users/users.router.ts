import { Router } from 'express'
import {UsersContr} from './users.ctrl'
export const usersRouter = Router()
usersRouter
.get('/find/:id_user', UsersContr.usersfind)
.post('/adduser/', UsersContr.usersadd)
.post('/login/', UsersContr.login)