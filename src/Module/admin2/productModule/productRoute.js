import express from 'express';
import { ProdC } from './productController.js';
import { upload, uploadTopImg } from '../../../utils/multer.js';

const productRoute = express.Router();

productRoute.post('/addproduct', upload, ProdC.addProduct);
productRoute.get('/getproduct', ProdC.getProduct);
productRoute.get('/getoneproduct/:id', ProdC.getOneProduct);
productRoute.patch('/updateproduct/:id', upload, ProdC.updateProduct);
productRoute.patch('/updateimage/:id', upload, ProdC.updateImage);
productRoute.patch('/update-topimg/:id', upload, ProdC.update_topImg);

productRoute.delete('/deleteproduct/:id', ProdC.deleteProduct);
productRoute.patch('/deleteimage/:id', ProdC.deleteImage);
productRoute.post('/contact', ProdC.contactUs);
productRoute.get('/getcontact', ProdC.getContact);
productRoute.get('/contact/:id', ProdC.getspecificContact);
productRoute.delete('/contact/:id', ProdC.contactDelete);
productRoute.post('/enquiry/:id', ProdC.enquiry);
productRoute.get('/enquiry', ProdC.getEnquiry);
productRoute.get('/one-enquiry', ProdC.getEnquiry);
productRoute.post('/login', ProdC.login);
productRoute.get('/dashboard', ProdC.dashboard);


export { productRoute };