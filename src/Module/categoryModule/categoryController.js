import { AppSucc } from '../../helpers/Appres.js';
import { validate } from '../../helpers/validate.js';
import { CategoryV } from '../../validator/categoryV.js';
import {service} from '../../helpers/service.js';
import { CateogryS } from './categoryService.js';

class CategoryController {
	constructor() { }

	async add(req, res, next) {
		await validate(req, next, CategoryV.category);
		const category = await service(req, next, CateogryS.add);
		return next(new AppSucc(category, 'success', 200));
	}

	async get(req, res, next) {
		const category = await service(req, next, CateogryS.get);
		return next(new AppSucc(category, 'success', 200));
	}

	async getProducts(req, res, next) {
		const category = await service(req, next, CateogryS.getProducts);
		return next(new AppSucc(category, 'success', 200));
	}

	async data(req, res, next) {
		const category = await service(req, next, CateogryS.data);
		return next(new AppSucc(category, 'success', 200));
	}
}

export const CategoryC = new CategoryController();