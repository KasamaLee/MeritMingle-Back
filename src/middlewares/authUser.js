
module.exports = (req, res, next) => {

    if (req.user.role !== 'USER') {
        res.status(401).json({ msg: 'This feature is allowed for users only.' })
    }
    next()

} 