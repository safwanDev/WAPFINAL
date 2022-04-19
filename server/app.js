const express = require('express');
const cors = require("cors");
const app = express();

const userRouter = require('./routes/userRouter');
const songRouter= require('./routes/songRouter');
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/songs',songRouter);

app.listen(8000, () => {
    console.log('listen on 8000' );
});