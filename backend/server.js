const express = require('express');
const app = express();

const userRoute = require('./router/user.route');

app.use(express.json());
require("dotenv").config();

app.use('/user', userRoute);


app.listen(3001, () => {
    console.log('Server is running on port 3000');
}
);