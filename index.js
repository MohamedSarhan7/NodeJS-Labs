const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const app = express();
const auth=require('./middleware/auth');
require("dotenv").config();


//  vars
const PORT = process.env.PORT;
const URL = process.env.MONGOO_URL;
const logFile = process.env.LOGFILE

//  Middelware
app.use(express.json());
app.use((req, res, next) => {
    data = `date: ${new Date()} || Method: ${req.method}  || Url: ${req.url} \n`;
    fs.appendFileSync(logFile, data, function (err) {
        if (err) console.log("err");
        // next();
    });

    next()
});

mongoose.connect(URL, (err) => {
    if (!err) return console.log('DB Connectioned ');
    console.log(err)
});



app.use(['/auth'], authRouter);
app.use(['/users'], auth, userRouter);
app.use(['/posts'],auth, postRouter);


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT} .....`)
})