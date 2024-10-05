const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    //removed deprecated options
}).then(() => {
    console.log("Connected to the MongoDB via Mongoose");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

// To parse JSON bodies
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(cookieParser());



jwtSecret = process.env.JWT_SECRET;


app.get('/test', (req, res) => {
    res.json('test okay');
});

//we want to get the token from our cookie to keep user logged in once the username and password have been recognized
app.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, userData) => {  //token is encoded using jwtSecret
            if(err) {
                res.status(401).json({error: 'Invalid token'});
            } else {
                // userData is being decoded from the token we are sending, return user data as JSON
                res.json(userData);
            }
        });
    } else {
        // Return a JSON error message
        res.status(401).json({error: 'No token provided'});
    }
});

app.post('/register', async (req, res) => {
    //
    const {username, password} = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({error: 'Username already exists'});
    }

    const createdUser = await User.create({username, password});
    //information within token
    jwt.sign({userId: createdUser._id}, jwtSecret, (err, token) => {
        if (err) return res.status(500).json({error: 'Error signing token'});
        res.cookie('token', token).status(201).json({
            id: createdUser._id,
            username,
        });
    });
});


app.listen(4000);
