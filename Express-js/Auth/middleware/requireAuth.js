export async function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        console.log('User not authenticated')
        return res.status(401).json({ error: 'Authentication required' })
    }
    next()
}   
