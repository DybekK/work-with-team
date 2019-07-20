import mongoose from "mongoose";

const Schema = mongoose.Schema;

// export type userDocument = mongoose.Document &  {
//     firstname: String,
//     lastname: String,
//     username: String,
//     password: String,
//     mail: String,
//     created_date: Date
// }

export const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    mail: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});