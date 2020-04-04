const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user-schema");
const MeetingSlot = require("./meeting-slots-schema");

/** Schema to have a list of booked slot by user and all related informations */
const bookingSchema = new Schema({
    booked_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    booked_slot: { type: Array, required: true },
    meeting_id: {type: Schema.Types.ObjectId, ref: 'MeetingSlot', required: true },
    comment: { type: String },
    attendees: { type: Array },
    booked_with: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now }
}, { autoCreate: true });

bookingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Bookings', bookingSchema);