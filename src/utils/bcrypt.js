import bcrypt from 'bcrypt';

const saltRound = 10;

export function hashPassword(password) {
	const salt = bcrypt.genSaltSync(saltRound);
	return bcrypt.hashSync(password, salt);
}

export function compPassword(plain, hashed) {
	return bcrypt.compareSync(plain, hashed);
}

