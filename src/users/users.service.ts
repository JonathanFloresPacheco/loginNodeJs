import bcrypt from 'bcrypt';
import aguid from "aguid";
import mongoose from "mongoose"
import users from "../models/users";
import { EMAIL, PASSWORD, JWT_SECRET } from "../config/env";
import JWT from "jsonwebtoken";
import registerMail from "../transporter/registerMail";
// const users = require('../models/users')
export class UsersServices {
    private resp0: Boolean;
    private message0:any;
    private hashed0:any;
    public async usersfind(token: string) {
        try {
        const userdata: any = JWT.verify(token,JWT_SECRET);
        console.log(userdata)
        if(userdata!==null){
            if(userdata._rol !== 'ADMIN'){
                return [{
                    success: 'userio no permitido',
                }];
            } else {
                const userval = users.find();
                console.log((await userval));
                return [{
                    success: 'usuario permitido',
                    data: JSON.stringify((await userval))
                }];
            }
        }
        }
        catch(error){
            return [{
                success: 'user faild',
                error
            }];
        }
    }
    public async usersadd(body: any) {
        try {
               const salt = await bcrypt.genSalt(10);
               this.hashed0 = await bcrypt.hash(body.password, salt);
               let usr = new users({
                _id: new mongoose.Types.ObjectId(),
                nombre: body.nombre,
                email: body.email,
                password: this.hashed0,
                role: body.role,
                verify: false});
                await usr.save()
                .then( result=> {
                    this.resp0 = true;
                    this.message0 = result;
                }).catch( error => {
                    this.resp0 = false;
                    console.log("error", error);
                    this.message0 = error;
                });
                if(this.resp0===true){
                    return {
                    status: "success",
                    message: this.message0
                    };
                } else{
                    return {
                            status: "failed",
                            message: this.message0
                    };
                }
        }
        catch(error){
            console.log(error);
            return [{
                success: 'user faild',
                error
            }];
        }
    }
    public async login(body: any) {
        try {
            const sid = aguid();
            const email0 = body.email;
            const userval = users.findOne({ email: email0 });
            const _rol = (await userval).role;
            const token0 = JWT.sign({
                sid,
                email0,
                _rol
            }, JWT_SECRET, {expiresIn: "24h"});

                console.log('The login is %s', (await userval).password); 
                const validPassword = await bcrypt.compare(body.password, (await userval).password);
                if (validPassword) {
                        var context = {
                            token: token0,
                            email: email0,
                        };
                        var options = {
                            email: body.email,
                            subject: "Nuevo Usuario",
                            template: "new_user",
                            // header:headerimage,
                            context:context,
                        };
                        registerMail(options);
                    return {
                        status: "success password"
                    };
                } else {
                    return [{
                        success: 'password faild'
                    }];
                }
        } catch(error){
            return [{
                success: 'user login faild',
                error
            }];
        }
    }
}
export default new UsersServices()
