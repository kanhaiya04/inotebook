const express = require('express');
const connectToMongo= require('./db');

const PORT=5000;

const app = express();
app.use(express.json());

connectToMongo();

app.use('/user/',require('./routes/userRoute'));

app.listen(PORT|| process.env.PORT, ()=>{
        console.log(`listening on port ${PORT}`);
})