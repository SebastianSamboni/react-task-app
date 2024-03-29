import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(['The email is already in use'])
        
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
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        })

        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token: token
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

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })
        
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(404).json({ message: 'No found' })

        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        })
        
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}