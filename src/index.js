import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import restaurant from '../routes/restaurants';
import user from '../routes/user';
import booking from '../routes/booking';
const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/zomatoProject', {
    useNewUrlParser: true
});

app.use(bodyParser.json());

app.use(cors());
app.use("/api/restaurants", restaurant);
app.use('/api/user', user);
app.use('/api/bookings', booking);

app.listen(PORT, () => console.log(`Server running on port ${PORT}, bcoz client wants to use port 3000.`));