import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

const userService = {
    register,
    login,
}

async function register(email, password, repassword) {
    const foundUser = await User.findOne({email});

    if(foundUser){
        throw new Error(`User with email ${email} already exists!`)
    }

    if (password !== repassword) {
        throw new Error('Passwords do not match!');
    }

    return User.create({ email, password });
}

async function login(email, password) {
    const user = await User.findOne({ email });
    const errorMsg = 'Invalid email or password!';

    if (!user) {
        throw new Error(errorMsg);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error(errorMsg);
    }

    const payload = {
        id: user.id,
        email: user.email
    }

    // TODO: use async sign
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

    return token;
}

export default userService;