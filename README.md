## Steps to run the application

1. `npm install`
2. `node app.js` or `nodemon`
3. In **config-dev.js/config.prod.js** add **username** and **password** for mongodb database.
4. Go to this url `https://localhost:5000/healthcheck` to check the server is up and running.

### Download postman collection from [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a0634e675c234ce783c4)


#### Naming conventions used in application

- **Book/Booking** - Used to represent the person who is booking the meeting.
- **Meetins/Meeting slot** - Used to represent the person with whom the meeting is fixed


**Project Directory Strucutre**

- __set\-meetings__
   - __Errorlog__
     - [error.log](Errorlog/error.log)
     - [info.log](Errorlog/info.log)
   - [README.md](README.md)
   - [app.js](app.js)
   - __bll__
     - [meeting\-slot\-adapter.js](bll/meeting-slot-adapter.js)
     - [user\-adapter.js](bll/user-adapter.js)
   - __config__
     - [config.dev.js](config/config.dev.js)
     - [config.prod.js](config/config.prod.js)
     - [index.js](config/index.js)
   - __controllers__
     - [base\-controller.js](controllers/base-controller.js)
     - [meeting\-slot\-controller.js](controllers/meeting-slot-controller.js)
     - [user\-controller.js](controllers/user-controller.js)
   - __db__
     - [index.js](db/index.js)
   - __helpers__
     - [utility.js](helpers/utility.js)
   - __middleware__
     - [basic\-auth.js](middleware/basic-auth.js)
     - [index.js](middleware/index.js)
   - __models__
     - [bookings\-schema.js](models/bookings-schema.js)
     - [meeting\-slots\-schema.js](models/meeting-slots-schema.js)
     - [user\-schema.js](models/user-schema.js)
   - [node\_modules](node_modules)
   - [package.json](package.json)
   - [resp\-types.js](resp-types.js)
   - __routes__
     - [api\-routes.js](routes/api-routes.js)
   - [yarn\-error.log](yarn-error.log)
   - [yarn.lock](yarn.lock)

