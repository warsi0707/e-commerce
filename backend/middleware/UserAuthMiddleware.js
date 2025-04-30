const { JWT_USER_SECRET } = require("../config")
const jwt = require("jsonwebtoken")


function UserAuthMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ 
            message: 'Unauthorized' ,
            authenticated: false
        })
    }
    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ 
            message: 'Forbidden' ,
            authenticated: false,
        })
    }
}

module.exports = {
    UserAuthMiddleware
}