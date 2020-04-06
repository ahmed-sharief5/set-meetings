const {google} = require('googleapis');
const googleCalenderSDK = require("./google-calender-sdk");


/**
 * Create and event on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function addEvents(data){
    const auth = await googleCalenderSDK.googleCalenderSDK();
    const calendar = google.calendar({version: 'v3', auth});
    const resource = {
        'summary': data.summary,
        'description' : data.description,
        'start' : {
            'dateTime': data.startTime.time,
            'timeZone': data.startTime.timeZone
        },
        'end' : {
            'dateTime': data.endTime.time,
            'timeZone': data.endTime.timeZone
        }
    }
    try{
        const addedEvent = await calendar.events.insert({
            calendarId: 'primary',
            resource,
          });
        return addedEvent.status;
    }
    catch(err){
        throw err;
    }
    // calendar.events.insert({
    //   calendarId: 'primary',
    //   resource,
    // }, function(err, res) {
    //   if (err) {
    //     console.log('Error: ' + err);
    //     return;
    //   }
    //   console.log(res);
    // });
}

module.exports.addEvents = addEvents;
