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
export async function getServerSideProps(ctx) {
	const { data } = await buildClient(ctx).get('/api/users/currentuser');
	console.log(data)
	return { props: data };
}

export default Root