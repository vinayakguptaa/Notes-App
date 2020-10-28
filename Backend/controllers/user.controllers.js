const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/user.model');
const Note = require('../models/note.model');

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!await User.findOne({ email })) {
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = new User({
                name,
                email,
                password: hash
            })
            await user.save().then((result) => {
                console.log(result);
                return res.status(200).json({
                    message: "User Registered Successfully!",
                    result
                });
            })
                .catch((err) => {
                    console.log(err);
                    return res.status(400).json({ message: "Failed" });
                });
        })
    } else {
        return res.status(409).json({ message: "Email Already Exists" });
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((result) => {
            bcrypt.compare(result.password, password, (err, rslt) => {
                if (rslt) {
                    const token = jwt.sign(
                        {
                            name: result.name,
                            email: result.email
                        },
                        process.env.jwtSecret,
                        {
                            expiresIn: "60d"
                        }
                    );
                    return res.status(200).json({
                        name: result.name,
                        email: result.email,
                        token
                    });
                } else {
                    return res.status(204).json({ message: "User not found" });
                }
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ message: "Failed" });
        });
}

const getAllNotes = async (req, res) => {
    const user = req.user;
    Note.find({ userId: _id })
        .then((result) => {
            if (result.length > 0) {
                return res.status(200).json({ result });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ message: "Failed" });
        })
}

module.exports = { RegisterUser, LoginUser, getAllNotes };