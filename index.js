const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');

const register = require('./routes/registerUser');
const auth = require('./routes/auth');
const activity = require('./routes/activities');
const challenge = require('./routes/challenges');
const user = require('./routes/user');
const subscription = require('./routes/subscription');
const daily = require('./routes/daily');

mongoose.connect('mongodb+srv://tim200002:30DayPassword@cluster0-jmtc0.mongodb.net/30DayChallenge?retryWrites=true&w=majority')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error(err));

//Make sure env Variables are set
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR JWT private Key is not defined');
  process.exit(1);
}

//Middleware
app.use(express.json());
app.use('/api/register', register);
app.use('/api/auth', auth);
app.use('/api/activity', activity);
app.use('/api/challenge', challenge);
app.use('/api/user', user);
app.use('/api/subscription', subscription);
app.use('/api/daily', daily);


//Starting express Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));