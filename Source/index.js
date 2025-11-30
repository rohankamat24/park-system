
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const cors = require('cors');
const path = require('path');
const { userRouter, authRouter, paymentRouter, bookingDataRouter } = require('./Routes/Router');

const app = express();
// app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    // origin: "https://deliverpizzasite.netlify.app", // NO trailing slash
    origin: "https://parking-site-with-backend-2.onrender.com", // NO trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);
app.use('/ticket', bookingDataRouter);

app.get('/ping',(req, res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
})


app.listen(serverConfig.PORT || 4000, async () => {
    await connectDB();
    console.log(`server started on port ${serverConfig.PORT}...!`);
    console.log(`You can watch on this site : http://localhost:5000/homepage/homepage.html`);

    // require('./Scheduler/Scheduler');
})


