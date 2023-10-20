import { Schema, model } from 'mongoose'

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true // Limpia espacios innecesarios
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

export default model('User', UserSchema, 'users')