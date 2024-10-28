import express from 'express';
import { CategoryC } from './categoryController.js';
import { AppSucc } from '../../helpers/Appres.js';

const CategoryRouter = express.Router();

CategoryRouter.get('/data', CategoryC.data);

CategoryRouter.post('/add', CategoryC.add);
CategoryRouter.get('/get', CategoryC.get);
CategoryRouter.get('/getProducts/:id', CategoryC.getProducts);

export { CategoryRouter };