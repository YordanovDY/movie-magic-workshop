import { Schema, model, Types } from 'mongoose';

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title must be at least 5 characters long!'],
        match: [/^[a-zA-z 0-9]+$/, 'Title must contain alphanumeric and whitespaces only!']
    },
    category: {
        type: String,
        enum: [
            'tv-show',
            'animation',
            'movie',
            'documentary',
            'short-film'
        ]
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Genre must be at least 5 characters long!'],
        match: [/^[a-zA-z 0-9]+$/, 'Genre must contain alphanumeric and whitespaces only!']
    },
    director: {
        type: String,
        required: [true, 'Director is required!'],
        minLength: [5, 'Director must be at least 5 characters long!'],
        match: [/^[a-zA-z 0-9]+$/, 'Director must contain alphanumeric and whitespaces only!']
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: [1900, 'Year must be in range 1900 to 2025'],
        max: [2025, 'Year must be in range 1900 to 2025']
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
    rating: {
        type: Number,
        min: [1, 'Rating must be in range 1 to 10'],
        max: [10, 'Rating must be in range 1 to 10']
    },
    description: {
        type: String,
        minLength: [20, 'Description must be at least 20 characters long!'],
        match: [/^[a-zA-z 0-9]+$/, 'Description must contain alphanumeric and whitespaces only!']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    extCasts: [{
        _id: false,
        character: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        }
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;