import mongoose,{Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import IUser from "../interfaces/users";

var rolesValidos ={
    values:["ADMIN","USER"],
    message:'{VALUE} no es un rol valido'
}
// var Schema = mongoose.Schema;

const UserSchema: Schema = new Schema({
    nombre:{
        type: String,
        required:[true,"El nombre es obligatorio"]
    },
    email:{
        type: String,
        unique:true,
        required:[true,"El correo es obligatorio"]
    },
    password:{
        type: String,
        required:[true,"La contraseña es obligatoria"]
    },
    role:{
        type: String,
        default: 'USER',
        required: [true],
        enum: rolesValidos
    },
    verify:{
        type: Boolean,
        required: true,
    }
});
UserSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
})
export default mongoose.model<IUser>('Users',UserSchema)