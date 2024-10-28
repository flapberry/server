import express from 'express';

import { productRoute } from '../Module/admin2/productModule/productRoute.js';
import { CategoryRouter } from '../Module/categoryModule/categoryRoute.js'

const route = express.Router();

route.get('/mail', async(req, res) => {
	res.json('Mail Sent');
})
route.use('/', productRoute);
route.use('/category', CategoryRouter);

export default route;
