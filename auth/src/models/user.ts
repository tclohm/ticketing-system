import mongoose from 'mongoose';

// MARK: Interface to describe properties required for a new user
interface UserAttrs {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = mongoose.model('User', userSchema);

// MARK: -- getting typescript involved
const buildUser = (attrs: UserAttrs) => {
	return new User(attrs)
}

export { User, buildUser };