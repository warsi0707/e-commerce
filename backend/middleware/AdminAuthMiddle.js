const jwt = require('jsonwebtoken')

function AdminAuthMiddle(req, res, next) {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' })
    }
}

module.exports = {
    AdminAuthMiddle
}