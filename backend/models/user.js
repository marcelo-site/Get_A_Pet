import { mongoose } from "../db/conn.js";
const { Schema } = mongoose
// import { Schema } from "mongoose";

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    },
    { timestamps: true})
)

export { User }