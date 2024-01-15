const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = require('../models/prisma');
const { registerSchema, loginSchema, googleSchema } = require('../validator/auth-validator');

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
    // console.log(accessToken);
    return accessToken;
}

exports.register = async (req, res, next) => {
    try {
        // body คือ req ที่ front ส่งมา
        const body = req.body

        const { error, value } = registerSchema.validate(body);
        // console.log(value)

        if (error) {
            return res.json({ error })
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);
        // console.log(hashedPassword)

        value.password = hashedPassword;
        value.role = process.env.REGISTER_USER;
        // value.role = 'ADMIN';

        const user = await prisma.user.create({
            data: value
        });

        const payload = {
            userId: user.id,
            role: user.role
        }

        const accessToken = generateToken(payload);

        delete user.password;

        res.status(200).json({ accessToken, user })

    } catch (err) {
        // next(err);
        res.status(500).json(err)
    }
}


exports.login = async (req, res, next) => {
    try {
        // const { email, password } = req.body;

        const { error, value } = loginSchema.validate(req.body);
        console.log(value);
        // value: {email, password}

        if (error) {
            return res.status(500).json({ msg: "user not found" })
        }


        const user = await prisma.user.findUnique({
            where: { email: value.email }
        })

        if (!user) {
            return res.status(500).json({ msg: "user not found" })
        }
        const isMatched = await bcrypt.compare(value.password, user.password)

        if (!isMatched) {
            // return res.status(500).json({ msg: "password is not matched" })
            throw new Error('not matched')
        }

        const payload = {
            userId: user.id,
            role: user.role
        }

        const accessToken = generateToken(payload);

        delete user.password;

        res.status(200).json({ accessToken, user })

    } catch (err) {
        next(err)

    }
}

exports.google = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const { error, value } = googleSchema.validate(reqBody);
        // console.log(value)
        // console.log(error)

        if (error) {
            return res.json({ msg: "Google Login Failed" })
        }

        const existedGoogleUser = await prisma.user.findFirst({
            where: {
                googleId: value.googleId
            }
        })

        // ### Register ###
        if (existedGoogleUser) {
            const payload = {
                userId: existedGoogleUser.id,
                role: existedGoogleUser.role
            }
            const accessToken = generateToken(payload);
            const user = existedGoogleUser;
            delete user.googleId
            delete user.password
            return res.status(200).json({ user, accessToken })
        }

        // ### Login ###
        value.role = process.env.REGISTER_USER  // role = 'USER'
        const googleUser = await prisma.user.create({
            data: value
        })
        delete googleUser.googleId
        delete googleUser.password

        const payload = {
            userId: googleUser.id,
            role: googleUser.role
        }
        const accessToken = generateToken(payload);
        res.status(200).json({ accessToken, googleUser })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getMe = async (req, res, next) => {
    res.status(200).json({ user: req.user })
}