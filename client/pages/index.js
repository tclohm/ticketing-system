import axios from 'axios';

const Root = ({ currentUser }) => {
	console.log(currentUser)
	return <h1>Root</h1>
}

// MARK: -- Function
export const getServerSideProps = async ({ req }) => {
	if (typeof window === 'undefined') {
		// MARK: -- Server
		// http://servicename.namespace.svc.cluster.local
		const { data } = axios.get(
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', 
			{
				withCredentials: true,
				headers: req.headers
			}
		).catch(err => {
			console.log(err)
			return { props: err }
		});
		return { props: data }
	} else {
		// MARK: -- Browser
		const { data } = await axios.get('/api/users/currentuser');
		return { props: data }
	}
}

export default Root