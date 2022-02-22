import mongoose from 'mongoose';
import Password from '../services/password';

// MARK: -- Interface to describe properties required for a new user
interface UserAttrs {
	email: string;
	password: string;
}

// MARK: -- Interface describe the properties the User model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): any;
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

// MARK: -- middleware before 'save' occurs
userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

// MARK: -- getting typescript involved, custom function in mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs)
}

// MARK: -- describes properties that a User Document has <single user>
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

// MARK: -- Generics <functions or types in the brackets>
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };