import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import user from '../models/user.js'

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

        res.status(200).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        console.log(`Error ${error}`)

        res.status(500).json({
            status: 'error',
            message: 'Error al realizar el registro'
        })
    }
}

export const login = async (req, res) => {
    const { email, password} = req.body

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json({ message: 'User not found' })
        
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })

        const token = await createAccessToken({ id: userFound._id })
        res.cookie('token', token)

        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(`Error ${error}`)

        res.status(500).json({
            status: 'error',
            message: 'Error al realizar el login'
        })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: 'User not found' })
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}