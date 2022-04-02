import buildClient from '../api/build-client';

const Root = ({ currentUser }) => {
	return (
		<div className="container">
			{currentUser === null ?
				<p>anonymous</p>
				:
				<p>{currentUser.email}</p>
			}
		</div>
	)
}

// MARK: -- Function
Root.getInitialProps = async (ctx) => {
	const { data } = await buildClient(ctx).get('/api/users/currentuser');
	return data;
}

export default Root