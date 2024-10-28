export class AppSucc {
	constructor(data, message, statusCode) {
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('2') ? 'Success' : 'valid';
		this.message = message;
		this.data = data != undefined ? data : null;
	}
}

export class AppErr extends Error {
	constructor(message, statusCode) {
		message = typeof message === String ? message : JSON.stringify(message);
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}
