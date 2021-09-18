const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1200;
//app.use(express.json());
app.use(bodyParser.json());

const userController = require('./controller/user.controller');
const galleryController = require('./controller/gallery.controller');

app.use('/user', userController);
app.use('/gallery', galleryController);
const connect = require('./configs/db');
app.listen(port, async () => {
    await connect();
    console.log(`express server is running on port : ${port}`);
});