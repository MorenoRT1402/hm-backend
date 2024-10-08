import { model, Schema } from "mongoose";
import { UserInput } from "../../interfaces/user";

const UserSchema = new Schema<UserInput>({
    name: String,
    picture: String,
    position: String,
    email: String,
    contact: String,
    joined: String,
    jobDesk: String,
    schedule: [String],
    status: String,
    password: String,
})

export const UserModel = model<UserInput>('User', UserSchema);