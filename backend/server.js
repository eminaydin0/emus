const express = require('express');
const app = express();

const userRoute = require('./router/user.route');
const bodyParser = require('body-parser');
const userModel = require('./models/user.model');

console.log(userModel);

app
    .use(express.json())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

require("dotenv").config();

app
    .use('/user', userRoute)


app.listen(3001, () => {
    console.log('Server is running on port 3001');
}
);