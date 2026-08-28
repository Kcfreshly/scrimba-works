import bcrypt from 'bcrypt'
import { getDBConnection } from '../db/db.js'
import validator from 'validator'

export async function registerUser(req, res) {
    let { name, email, username, password } = req.body

    if (!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    name = name.trim()
    email = email.trim()
    username = username.trim()

    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
        return res.status(400).json({ error: 'Username must be 3-30 characters long and can only contain letters, numbers, and underscores' })
    }

    if (validator.isEmail(email) === false) {
        return res.status(400).json({ error: 'Invalid email format' })
    }

    try {
        const db = await getDBConnection()

        const existingUser = await db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username])
        if (existingUser) {
            return res.status(400).json({ error: 'Email or username already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await db.run('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, hashedPassword])

        req.session.userId = result.lastID

        res.status(201).json({ message: 'User registered successfully' })

    } catch (err) {
        res.status(500).json({ error: `Failed to register user: ${err.message}` })
    }
}
export async function loginUser(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' })
    }

    try {
        const db = await getDBConnection()

        const user = await db.get('SELECT * FROM users WHERE username = ?', [username])
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        req.session.userId = user.id

        res.json({ message: 'Login successful' })

    } catch (err) {
        res.status(500).json({ error: `Failed to login user: ${err.message}` })
    }
}

export async function logoutUser(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout user' })
        }
        res.clearCookie('connect.sid')
        res.json({ message: 'Logout successful' })
    })
}