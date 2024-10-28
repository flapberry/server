import { Admin2db } from '../../../db/mongoose/admin2Schema.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { compPassword } from '../../../utils/bcrypt.js';
import { contactMail, dynamicMail, sendContactMail, sendMail } from '../../../utils/mail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

class ProductService {
	constructor() { }
	
	async addProduct(req) {
		try {
			req.body.img = [];
			for (let i = 0; i < req.files.length; i++){
				req.body.img.push(req.files[i].filename);
			}
			const prod = await Admin2db.product.create(req.body);
			const category = await Admin2db.category.findById(req.body.category);
			category.products.push(prod._id);
			await category.save();
			return prod;
		} catch (err) {
			return err;
		}
	}

	async getProduct(req) {
		try {
			const products = await Admin2db.product.find({});
			console.log("🚀 ~ ProductService ~ getProduct ~ products:", products)
			
			const productsWithBase64Images = await Promise.all(products.map(async (product) => {
				const base64Images = await Promise.all(product.img.map(async (image) => {
					const imagePath = path.join(__dirname, '../../../images', image);
					const imageBuffer = await readFile(imagePath);
					return `data:image/png;base64,${imageBuffer.toString('base64')}`;
				}));
				return { ...product._doc, img: base64Images };
			}));
			return productsWithBase64Images;
		} catch (err) {
			return err;
		}
	}

	async getOneProduct(req) {
		try {
			const prod = await Admin2db.product.findById(req.params.id);
			if (!prod) return 'no Prod';
			const base64Images = await Promise.all(prod.img.map(async (image) => {
				const imagePath = path.join(__dirname, '../../../images', image);
				const imageBuffer = await readFile(imagePath);
				return `data:image/png;base64,${imageBuffer.toString('base64')}`;
			}));
			console.log(prod);
			return { ...prod._doc, img: base64Images, imgNames: prod.img };
		} catch (err) {
			return err;
		}
	}

	async updateProduct(req) {
		try {
			const prod = await Admin2db.product.findByIdAndUpdate(req.params.id, req.body, { new: true });
			if (!prod) return 'no Prod';
			for (let i = 0; i < req.files.length; i++){
				prod.img.push(req.files[i].filename);
			}
			await prod.save();
			const base64Images = await Promise.all(prod.img.map(async (image) => {
				const imagePath = path.join(__dirname, '../../../images', image);
				const imageBuffer = await readFile(imagePath);
				return `data:image/png;base64,${imageBuffer.toString('base64')}`;
			}));
			return { ...prod._doc, img: base64Images };
		} catch (err) {
			return err;
		}
	}

	async deleteProduct(req) {
		try {
			const prod = await Admin2db.product.findByIdAndDelete(req.params.id);
			if (!prod) throw new Error('Prod Id Doesnt Exist');
			await Promise.all(prod.img.map(async (image) => {
				const imagePath = path.join(__dirname, '../../../images', image);
				try {
					await unlink(imagePath);
				} catch (err) {
					console.error(`Error deleting image ${image}:`, err);
				}
			}));
			return 'Deleted Successfully';
		} catch (err) {
			return err;			
		}
	}

	async deleteImage(req) {
		try {
			const prod = await Admin2db.product.findById(req.params.id);
			const img = prod.img.splice(prod.img.findIndex((i) => i === req.body.img), 1);
			if (img === -1) throw new Error('No Image in The DB');
			const imagePath = path.join(__dirname, '../../../images', img[0]);
			try {
				await unlink(imagePath);
			} catch (err) {
				console.error(`Error deleting image ${img}:`, err);
			}
			await prod.save();
			return 'Image Deleted Successfully';
		} catch (err) {
			return err;
		}
	}

	async contactUs(req) {
		try {
			const con = await Admin2db.contact.create(req.body);
			await contactMail('flapberrywhistle@gmail.com', con.name, con.mail, con.phno, con.date.toISOString().split('T')[0], con.message);
			await Admin2db.user.findByIdAndUpdate('66c2cb5300aa307e85b0bf20', { $inc: { contatusMail: 1 } });
			return con;
		} catch (err) {
			return err;
		}
	}

	async getContact(req) {
		try {
			const con = await Admin2db.contact.find({});
			return con.reverse();
		} catch (err) {
			return err;
		}
	}

	async getspecificContact(req) {
		try {
			const con = await Admin2db.contact.findById(req.params.id);
			if (!con) return null;
			return con;
		} catch (err) {
			return err;
		}
	}

	async contactDelete(req) {
		try {
			await Admin2db.contact.findByIdAndDelete(req.params.id);
			return 'Deleted Successfully';
		} catch (err) {
			return err;
		}
	}

	async Enquiry(req) {
		try {
			const enq = await Admin2db.enquiry.create(req.body);
			const prod = await Admin2db.product.findByIdAndUpdate(req.params.id, { $push: { callback: enq._id } }, { new: true });
			await dynamicMail('flapberrywhistle@gmail.com', enq.name, prod.name, enq.mail, enq.phno, enq.date.toISOString().split('T')[0], enq.quantity, enq.message);
			await Admin2db.user.findByIdAndUpdate('66c2cb5300aa307e85b0bf20', { $inc: { enquiryMail: 1 } });
			return prod;
		} catch (err) {
			return err;
		}
	}

	async getEnquiry(req) {
		try {
			const enq = await Admin2db.product.find({}).populate('callback');
			if (enq.length === 0) return null; 
			const productsWithBase64Images = await Promise.all(enq.map(async (product) => {
				const base64Images = await Promise.all(product.img.map(async (image) => {
					const imagePath = path.join(__dirname, '../../../images', image);
					const imageBuffer = await readFile(imagePath);
					return `data:image/png;base64,${imageBuffer.toString('base64')}`;
				}));
				return { ...product._doc, img: base64Images };
			}));
			return productsWithBase64Images;
		} catch (err) {
			return err;
		}
	}

	async login(req) {
		try {
			const user = await Admin2db.user.findOne({username: req.body.username});
			if (!user) return null;
			if (!compPassword(req.body.password, user.password)) {
				throw new Error('Password Dont Match');
			}
			return user;
		} catch (err) {
			return err;
		}
	}

	async updateImage(req) {
		try {
			const prod = await Admin2db.product.findById(req.params.id);
			console.log('🎒', prod);
			if (!prod) return 'no Prod';
			for (let i = 0; i < req.files.length; i++){
				prod.img.push(req.files[i].filename);
			}
			await prod.save();
			return prod;
		} catch (err) {
			return err;
		}
	}

	async dashboard(req) {
		try {
			const product = (await Admin2db.product.find({})).length;
			const enquiry = (await Admin2db.enquiry.find({})).length;
			const contact = (await Admin2db.contact.find({})).length;
			const admin = await Admin2db.user.findById('66c2cb5300aa307e85b0bf20');
			return { product, enquiry, contact, admin };
		} catch (err) {
			return err;
		}
	}

	async update_topImg(req) {
		try {
			const prod = await Admin2db.product.findById(req.params.id);
			if (!prod) return 'no Prod';
		
			const img = prod.img.splice(0, 1);
			const imagePath = path.join(__dirname, '../../../images', img[0]);
			try {
				await unlink(imagePath);
			} catch (err) {
				console.error(`Error deleting image ${img}:`, err);
			}
			prod.img.unshift(req.files[0].filename);
			await prod.save();
			return prod;
		} catch (err) {
			return err;
		}
	}
}

export const ProdS = new ProductService();

