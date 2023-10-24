
module.exports = (req, res, next) => {

    if (req.user.role !== 'ADMIN') {
        res.status(401).json({ msg: 'This feature is allowed for admins only.' })
    }
    next()

} 