import { getDBConnection } from '../db/db.js'

export async function getcurrentUser(req, res) {

  try {

    const db = await getDBConnection()

    const userId = req.session.userId

    if (!userId) {
      return res.json({ isLoggedIn: false })
    }

    const user = await db.get('SELECT name FROM users WHERE id = ?', [userId])

    res.json({ isLoggedIn: true, name: user.name })
  } catch (err) {
    res.status(500).json({ error: `Failed to get current user: ${err.message}` })
  }
}