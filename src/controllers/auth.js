import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const pwdHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: pwdHash
        })

        const userSaved = await newUser.save()

        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)
        res.json({
            message: 'User created succesfully'
        })

        // res.status(200).json({
        //     id: userSaved._id,
        //     username: userSaved.username,
        //     email: userSaved.email,
        //     createdAt: userSaved.createdAt,
        //     updatedAt: userSaved.updatedAt
        // })
    } catch (error) {
        console.log(`Error ${error}`)

        res.status(500).json({
            status: 'error',
            message: 'Error al realizar el registro'
        })
    }
}

export const login = (req, res) => {
    res.send('login')
}