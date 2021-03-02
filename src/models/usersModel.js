import mongoose from 'mongoose';

const { Schema } = mongoose;
const model = new Schema({
    // firstName: {type: String, required: true},
	// lastName: {type: String, required: true},
	username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    groups: []
 });

export default mongoose.model('Users', model, 'users');