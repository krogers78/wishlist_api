const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
    require('dotenv').load();
}

const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'app/assets')));

const port = 3000;

app.listen(port, function () {
    console.log('Server running on port: ' + port);
})

const myApp = require('./app/app');
myApp(app);