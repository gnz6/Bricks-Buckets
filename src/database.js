const  mongoose  = require("mongoose")
const {MONGODB_URI ,NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env
require("dotenv").config();

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(db=> console.log('DB connected'))
.catch(err=>console.log( err))