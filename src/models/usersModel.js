import mongoose from 'mongoose';
import { token } from 'morgan';

const { Schema } = mongoose;

const model = new Schema({
    firstName: {type: String},
	lastName: {type: String},
	username: {type: String, required: true, unique: true},
    usernameLowercase: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    groups: [],
    token: {type: String,unique: true },
 });

export default mongoose.model('Users', model, 'users');