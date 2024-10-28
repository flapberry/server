import joi from 'joi';

class AdminValidator {

	constructor() {
		this.product = joi.object({
			name: joi.string().min(2).max(30).required(),
			description: joi.string().required(),
			size: joi.string().required(),
			cost: joi.number().required(),
			category: joi.string().required(),
			discount: joi.object({
				percentage: joi.number().min(1).max(100).required(),
				cost: joi.number().required()
			}),
		}).required();

		this.deleteImage = joi.object({
			img: joi.string().min(2).required(),
		}).required();

		this.contactUs = joi.object({
			name: joi.string().min(2).required(),
			mail: joi.string().email().required(),
			phno: joi.string().min(9).max(12),
			message: joi.string().required(),
		}).required();

		this.enquiry = joi.object({
			name: joi.string().min(2).required(),
			mail: joi.string().email().required(),
			phno: joi.string().required(),
			message: joi.string().required(),
			quantity: joi.number().required()
		}).required();

		this.login = joi.object({
			username: joi.string().required(),
			password: joi.string().required(),
		}).required();

	}

}

export const Admin2V = new AdminValidator();


