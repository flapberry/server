export function modelType(req, res, next) {
	if (req.path.includes('/admin')) {
		req.modeltype = 'Admin';
	}
	else req.modeltype = 'User';
	next();
}