import User from "../models/User.js"

const userService = {
    register,
}

function register(email, password, repassword) {
    if(password !== repassword){
        throw new Error('Passwords do not match!');
    }

    return User.create({ email, password });
}

export default userService;