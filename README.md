## Steps to run the application

1. `npm install`
2. `node app.js` or `nodemon`
3. In **config-dev.js/config.prod.js** add **username** and **password** for mongodb database.


#### Naming conventions used in application

- **Book/Booking** - Used to represent the person who is booking the meeting.
- **Meetins/Meeting slot** - Used to represent the person with whom the meeting is fixed


**Project Directory Strucutre**
`
|____middleware
| |____index.js
| |____basic-auth.js
|____bll
| |____meeting-slot-adapter.js
| |____user-adapter.js
|____yarn-error.log
|____config
| |____config.dev.js
| |____index.js
| |____config.prod.js
|____models
| |____user-schema.js
| |____meeting-slots-schema.js
| |____bookings-schema.js
|____README.md
|____yarn.lock
|____.gitignore
|____package.json
|____resp-types.js
|____db
| |____index.js
|____controllers
| |____user-controller.js
| |____meeting-slot-controller.js
| |____base-controller.js
|____routes
| |____api-routes.js
|____helpers
| |____utility.js
|____app.js
|____Errorlog
| |____error.log
| |____info.log

`