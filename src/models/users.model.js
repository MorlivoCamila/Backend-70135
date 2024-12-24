import { Schema, model } from 'mongoose'

const usersCollection  = 'users'
const UserSchema       = new Schema({

    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    pets: {
        type: Array
    }
        
})

export const userModel = model(usersCollection, UserSchema)