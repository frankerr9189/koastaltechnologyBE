const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');


// import routes
const feedbackRoutes= require('./routes/feedback');
const userRoutes= require('./routes/auth');


const app = express();

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
).then(()=> console.log('DB Connected'))

mongoose.connection.on('error', err=>{
    console.log(`DB connection error: ${err.message}`)
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


//routes
app.use('/api', feedbackRoutes);
app.use('/api', userRoutes);
//
const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Server is running on port ${port}`));
