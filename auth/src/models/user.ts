import mongoose from 'mongoose';

// MARK: Interface to describe properties required for a new user
interface UserAttrs {
	email: string;
	password: string;
}

// MARK: Interface describe the properties the User model has
interface UserModel extends mongoose.Model<any> {
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

// MARK: -- getting typescript involved, custom function in mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs)
}

// MARK: -- describes properties that a User Document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

User.build({
	email: "heello@goma.com",
	password: "coolbeans"
})

export { User };