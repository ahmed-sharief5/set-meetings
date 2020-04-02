const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    active: { type: String, required: true , default: 1},
    createdDate: { type: Date, default: Date.now }
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);