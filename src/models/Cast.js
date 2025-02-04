import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name must be at least 5 characters long!'],
        match: [/^[a-zA-z 0-9]+$/, 'Name must contain alphanumeric and whitespaces only!']
    },
    age: {
        type: Number,
        min: [1, 'Age must be in range 1 to 120'],
        max: [120, 'Age must be in range 1 to 120']
    },
    born: {
        type: String,
        required: [true, 'Born is required!'],
        minLength: [10, 'Born must be at least 10 characters long!'],
        match: [/^[a-zA-z 0-9]+$/, 'Born must contain alphanumeric and whitespaces only!']
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function (v) {
                const condition = v.startsWith('http') || v.startsWith('https');
                return condition;
            },
            message: (props) => 'Invalid image URL'
        }
    },
});

const Cast = model('Cast', castSchema);

export default Cast;