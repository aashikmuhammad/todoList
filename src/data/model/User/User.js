import mongoose from 'mongoose';
import validator from  'validator';

const User = mongoose.model('User', {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        mimLength: 8,
        validate(value){
            if(value && value.toString().toLowerCase().includes('password')){
                throw new Error(`Your password includes a word "PASSWORD"`)
            }
        }
    }
})

export default User;