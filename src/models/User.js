import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minLength: [10, 'Email must be at least 10 characters long!'],
        match: [/^[a-zA-z]+[a-zA-Z0-9\.]*[a-zA-z0-9]+@[a-zA-z]{2,}\.[a-zA-z]{2,}$/, 'Invalid email address!']
    },
    password: {
        type: String,
        minLength: [6, 'Password must be at least 6 characters long!'],
        match: [/^\w+$/, 'Invalid password format']
    }
});

userSchema.pre('save', async function () {
    if (this.password.length < 60) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

const User = model('User', userSchema);

export default User;