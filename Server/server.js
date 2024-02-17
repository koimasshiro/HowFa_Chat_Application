const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRoute = require('./Routes/AuthRoute')
const ChatRoute = require("./Routes/ChatRoute");
const UserRoute = require("./Routes/UserRoute");
const connectDB = require('./Config/db');
const {notFound, errorHandler} = require("./Middlewares/errorHandler");
const MessageRoute = require('./Routes/MessageRoute');


const app = express();

//Middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
dotenv.config();

//Database connection
connectDB();

app.get('/', (req, res)=>{
    res.send('Yaay! API is running');
});


const PORT = process.env.PORT || 5000

app.listen(PORT,  console.log(`Server running on port:${PORT}`));


//usage of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)


//Error Handlers
app.use(notFound);
app.use(errorHandler);