import mongoose from 'mongoose';
const { Schema } = mongoose;

const model = new Schema({
    name: {type: String, required: true, unique: true},
	description: {type: String, required: true, unique: true},
	owner: String,
    admin:[ String ]

});

export default mongoose.model('Marketplaces', model, 'marketplaces');