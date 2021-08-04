import { model, Model, Schema, Document } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
  admin: string
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
})

const User: Model<IUser> = model('User', UserSchema)

export default User
