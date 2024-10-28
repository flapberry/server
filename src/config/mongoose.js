import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGOOSE_URL).then(()=> {
	console.log('MONGO DB Connected At Test Mongoose');
}).catch(err => console.log('Err Connecting At Test Mongoose', err));