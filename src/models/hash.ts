import bcrypt from "bcryptjs";
import { AnyObject } from "mongoose";

export class Hash {
    private hashed: any;
    hashPassword (password: any) {
    bcrypt.hash(password, 10, (err, hash)=> {
    if (err) {
        console.log(err);
        return "error";
    }
    else {
        this.hashed = hash;
        console.log("this.hashed", this.hashed);
        return this.hashed;
    }
    });
    }
}