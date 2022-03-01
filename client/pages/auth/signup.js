import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const Signup = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email, password
		},
		onSuccess: () => Router.push('/')
	});

	const onSubmit = async e => {
		e.preventDefault();
		doRequest();
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
			{errors}
			<button className="btn btn-primary">Sign Up</button>
		</form>
	)
}

export default Signup;