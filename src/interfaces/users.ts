import {Document} from 'mongoose'

export default interface IUser extends Document{
    nombre:String,
    email:String,
    password:String,
    role:String,
    verify: Boolean
}