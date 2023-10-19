const jwt = require('jsonwebtoken')
const prisma = require('../models/prisma')

module.exports = async (req, res, next) => {
    try {

        // ตรวจสอบ Header
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('unauthenticated')
        }

        const token = authorization.split(' ')[1];
        // ตรวจสอบ Token ด้วย JWT: ใช้ jwt.verify() 
        // ตรวจสอบว่า token นั้นถูกต้องหรือไม่โดยใช้ secret key ที่เราเก็บไว้.
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })

        // ตรวจสอบผู้ใช้ในฐานข้อมูล: ด้วย payload ที่ได้รับจาก token
        if (!user) {
            throw new Error('unauthenticated')
        }

        delete user.password;

        // หากค้นพบข้อมูลผู้ใช้นั้นในฐานข้อมูล
        // แนบผู้ใช้ไปกับ request: หากทุกอย่างถูกต้อง, middleware จะแนบข้อมูลของผู้ใช้ไปกับ request 
        // user: {'2','john','doe','john@gmail.com','0899999999','$2a$10$TLyBSSrUHMVQlsCzHecJqe6JU7kFxnCsNRWFeuRXGEQNOrX0Ce.9O',NULL,'USER'}
        req.user = user;

        // เรียก next() เพื่อส่งการควบคุมต่อไปยัง middleware หรือ controller ต่อไป
        next()

    } catch (err) {
        console.log(err)
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            err.statusCode = 401;
        }
        next(err);
    }
}