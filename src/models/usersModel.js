import mongoose from 'mongoose';

const { Schema } = mongoose;

const model = new Schema({
    firstName: {type: String},
	lastName: {type: String},
	username: {type: String, required: true, unique: true},
    usernameLowercase: {type: String, required: true},
    password: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    groups: []
 });

export default mongoose.model('Users', model, 'users');