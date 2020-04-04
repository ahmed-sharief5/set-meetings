const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user-schema");
// mongoose.set("debug", (collectionName, method, query, doc) => {
//     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });

/** Schema to have a list of available and booked slot of manager/admin */
const meetingSlotsSchema = new Schema({
    date: { type: Date, required: true, unique: true },
    available: { type: Array },
    booked: { type: Array },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now }
}, { autoCreate: true });

meetingSlotsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('MeetingSlots', meetingSlotsSchema);