import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';


const scryptAsync = promisify(scrypt);

export default class Password {
	// MARK: -- static does not need new instance
	static async toHash(password: string) {
		const salt = randomBytes(8).toString('hex');
		// MARK: -- typecasting
		const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
		return `${buffer.toString('hex')}.${salt}`;
	}

	static async compare(stored: string, supplied: string) {
		const [hashed, salt] = stored.split('.');
		const buffer = (await scryptAsync(supplied, salt, 64)) as Buffer;
		return buffer.toString('hex') === hashed
	}
}