const User = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { name, surName, email, userName, dateBirth, password } = req.body;
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
        res.status(201).send({ user, token });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await User.findOne({ where: { email, userName } });

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ error: 'E posta adı veya şifre hatalı' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const user = async (req, res) => {
    res.send(req.user);
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        await req.user.destroy();
        res.send(req.user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    user,
    logout,
    deleteUser
}