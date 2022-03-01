import buildClient from '../api/build-client';

const Root = ({ currentUser }) => {
	return (
		<div>
			{currentUser === null ?
				<p>anonymous</p>
				:
				<p>{currentUser.email}</p>
			}
		</div>
	)
}

// MARK: -- Function
export const getServerSideProps = async (ctx) => {
	const { data } = await buildClient(ctx).get('/api/users/currentuser');
	return { props: data };
}

export default Root