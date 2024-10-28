import joi from 'joi';

class CategoryValidation {
	constructor() {
		this.category = joi.object({
			name: joi.string().min(2).max(30).required(),
			description: joi.string().required(),
		}).required();
	}
}

export const CategoryV = new CategoryValidation();
