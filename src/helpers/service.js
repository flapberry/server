import { AppErr } from './Appres.js';

export async function service(req, next, Service) {
	const val = await Service(req);
	if (!val) return next(new AppErr('Model Returned Null', 401));
	if (val instanceof Error) return next(new AppErr(Error, 404));
	return val;
}