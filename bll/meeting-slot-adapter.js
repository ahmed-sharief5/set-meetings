#!/usr/bin/env node
"strict mode";
"esversion:6";

const config = require('../config');
const db = require('../db');
const { MeetingSlot, Bookings } = db;
const events = require("../services/events");

const MEETING_TIME = 60; // in minutes

function combineDateTime(date, time, add){
    const month = date.getMonth()+1;
    const day = date.getDate();
    const year = date.getFullYear();

    const dateTime = new Date(`${year}-${month}-${day} ${time}`)

    if(add){
        return new Date(dateTime.setMinutes(dateTime.getMinutes() + MEETING_TIME));
    }
    else{
        return dateTime;
    }
}

async function findSlotsData(date, user_id){
    try{
        const slotsData = await MeetingSlot.findOne({ date, user_id });
        return slotsData;
    }
    catch(err){
        throw err;
    }
}

async function findBookingSlotData(date, booked_by){
    try{
        const slotsData = await Bookings.findOne({ booked_by, date });
        return slotsData
    }
    catch(err){
        throw err;
    }
}

async function findBookingsById(book_id){
    try{
        const bookingData = await Bookings.findOne({book_id:book_id});
        return bookingData;
    }
    catch(err){

    }
}

async function userDefiningSlots(data, userId){
    const { date, time } = data;
    try{
        const defineSlot = new MeetingSlot({ ...data });
        const slotsData = await findSlotsData(date, userId);

        defineSlot.available = time;
        defineSlot.user_id = userId;

        if(slotsData != null){
            const updateSlots = await MeetingSlot.updateOne({ 'date': new Date(date) }, {$set : {'available': time}}, { upsert: false, multi: false }).exec();
            return updateSlots;
        }
        else{
            const insertSlots = await defineSlot.save();
            return {
                available_slots: insertSlots.available,
                booked: insertSlots.booked,
                date: insertSlots.date
            }
        }

    }
    catch(err){
        throw err;
    }

}

async function userBookingSlot(data, userId){
    const { date, time, comment, attendees, book_with, summary, description } = data;
    try{
        const bookingSlot = new Bookings({ ...data });
        const bookWithSlotsData = await findSlotsData(date, book_with);
        const bookingSlotData = await findBookingSlotData(date, userId);
        
        if(bookWithSlotsData != null) {

            bookingSlot.booked_by = userId;
            bookingSlot.comment = comment;
            bookingSlot.attendees = attendees;
            bookingSlot.booked_with = book_with;

            time.map(t => {
                const indexOfTime = bookWithSlotsData.available.indexOf(t);
                if(indexOfTime > -1){
                    const removeTime = bookWithSlotsData.available.splice(indexOfTime, 1);
                    const booked_data = {
                        time: removeTime[0],
                        time_zone: "GMT",
                        booking_id: bookingSlot._id
                    }
                    bookWithSlotsData.booked.push(booked_data);
                    bookingSlot.booked_slot.push(booked_data);
                }
                else{
                    bookingSlot.booked_slot = bookingSlotData.booked_slot;
                }
            });

            if(bookingSlotData != null){
                await Bookings.updateOne({ 'date': new Date(date) }, {$set : {'attendees': attendees, 'booked_slot':bookingSlot.booked_slot, 'comment': comment }}, { upsert: false, multi: false }).exec();
            }
            else{
                await bookingSlot.save();
            }
            await MeetingSlot.updateOne({ 'date': new Date(date) }, {$set : {'available': bookWithSlotsData.available, 'booked':bookWithSlotsData.booked }}, { upsert: false, multi: false }).exec();

            bookWithSlotsData.booked.map(async (event) => {
                const eventDate = bookWithSlotsData.date;

                const eventData = {
                    summary: data.summary,
                    description: data.description,
                    startTime: {
                        time: combineDateTime(eventDate, event.time, false),
                        timeZone: event.time_zone
                    },
                    endTime: {
                        time: combineDateTime(eventDate, event.time, true),
                        timeZone: event.time_zone
                    }
                }
                await events.addEvents(eventData);
            });

            return {
                booking_id: bookingSlot._id,
                booked_at: {
                    date: bookWithSlotsData.date,
                    time: bookWithSlotsData.booked
                }
    
            };    
        }
        else{
            return {
                message: `No slots available at this date ${date}`
            }
        }
        
    }
    catch(err){
        throw err;
    }
}

async function getAllMeetings(user_id){
    try{
        const getMeetings = await MeetingSlot.aggregate([
            { $match: { user_id } },
			{
				$lookup: {
					from: 'bookings',
					localField: 'booked.booking_id',
					foreignField: '_id',
					as: 'booking_data'
				}
			},
            { $unwind: '$booking_data' },
            {
				$project: {
					_id: 0,
					available: '$available',
					booked: '$booked',
					date: '$date',
					attendees: '$booking_data.attendees',
                    comment: '$booking_data.comment',
                    booked_by: '$booking_data.booked_by',
				}
			},
        ]);
        return getMeetings;
            
    }
    catch(err){
        throw err;
    }
}

async function getAllMyBookings(user_id){
    try{
        const getBookings = await Bookings.find({booked_by:user_id});
        return getBookings.map(bookings => {
            return {
                booked_slot: bookings.booked_slot,
                attendees: bookings.attendees,
                date: bookings.date,
                comment: bookings.comment,
                booked_by: bookings.booked_by,
                booked_with: bookings.booked_with,
            };
        });
    }
    catch(err){
        throw err;
    }
}

module.exports.userDefiningSlots = userDefiningSlots;
module.exports.userBookingSlot = userBookingSlot;
module.exports.getAllMyBookings = getAllMyBookings;
module.exports.getAllMeetings = getAllMeetings;
