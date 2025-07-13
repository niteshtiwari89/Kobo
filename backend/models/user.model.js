import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'],
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is invalid',
        },
    },
    country: {
        type: String,
        required: true,
        enum: ['Nigeria', 'India', 'Ghana', 'Kenya', 'South Africa', 'Togo', 'Benin', 'Cameroun', 'Senegal', 'Mali', 'Niger', 'Chad', 'Ivory Coast', 'Guinea', 'Guinea Bissau', 'Sierra Leone', 'Liberia', 'Gambia', 'Cape Verde', 'Sao Tome and Principe'],
        default: 'India',
    },
    sector: {
        type: String,
        required: true,
        enum: ['Cardiologist', 'Dentist', 'Dermatologist', 'Endocrinologist', 'Gynecologist', 'Neurologist', 'Oncologist', 'Ophthalmologist', 'Orthopedist', 'Pediatrician', 'Psychiatrist', 'Radiologist', 'Urologist', 'Others'],
        default: 'Others',
    },
    organization: {
        type: String,
        required: true,
        enum: ['Government', 'Private', 'NGO', 'Others'],
        default: 'Others',
    },
    updates: {
        type: Boolean,
        required: true,
        default: false,
    },
    policies: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        // select: false, // Hide password in queries
    },
});


const User = mongoose.model('User', UserSchema);
export default User;
