import { Admin2db } from '../../db/mongoose/admin2Schema.js';
import { AppErr } from '../../helpers/Appres.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

class CategoryService {
	constructor() { }
	
	async add(req) {
		let data;
		try {
			data = await Admin2db.category.create(req.body);
		} catch (err) {
			return new AppErr(err.message, 400);
		}
		return data;
	}

	async get(req) {
		try {
			const data = await Admin2db.category.find({});
			return data;
		} catch (err) {
			// res.json(err.message, 400)
			return new AppErr(err.message, 400);
		}
	}

	async getProducts(req) {
		try {
			const { products } = await Admin2db.category.findById(req.params.id).populate('products');

			let imageBuffer;
			const productsWithBase64Images = await Promise.all(products.map(async (product) => {
				const base64Images = await Promise.all(product.img.map(async (image) => {
					const imagePath = path.join(__dirname, '../../images', image);
					try {
						imageBuffer = await readFile(imagePath);
					} catch (err) {
						console.log('👖', 'in catch');
						return;
					}
					return `data:image/png;base64,${imageBuffer.toString('base64')}`;
				}));
				return { ...product._doc, img: base64Images };
			}));
			return productsWithBase64Images;
		} catch (err) {
			return new AppErr(err.message, 400);
		}
	}

	async data(req) {
		return 'data';
	}
}

export const CateogryS = new CategoryService();