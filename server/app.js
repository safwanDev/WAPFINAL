const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');

app.use(express.json());

app.use('/users', userRouter);

app.listen(8000, () => {
    console.log('listen on 8000' );
});