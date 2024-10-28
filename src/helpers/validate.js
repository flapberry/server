import { AppErr } from './Appres.js';

export async function validate(req, next, validate) {
	try { 
		const {err} = await validate.validateAsync(req.body);
	}
	catch (err) {
		console.log(err.details.message);
		return next(new AppErr(err.details, 422));
	}
}

