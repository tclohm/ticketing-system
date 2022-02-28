import { useState } from 'react';

const Signup = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		console.log(email, password)
	}

	return (
		<form className="container" onSubmit={onSubmit}>
			<h1>Sign up</h1>
			<div className="form-group">
				<label className="fs-6 fw-lighter text-muted">Email Address</label>
				<input value={email} 
					   onChange={ e => setEmail(e.target.value) } 
					   className="form-control" />
			</div>
			<div className="form-group">
				<label className="fs-6 fw-lighter text-muted">Password</label>
				<input 	type="password" 
						value={password} 
						onChange={ e => setPassword(e.target.value) } 
						className="form-control" 
				/>
			</div>
			<button className="btn btn-primary">Sign Up</button>
		</form>
	)
}

export default Signup;