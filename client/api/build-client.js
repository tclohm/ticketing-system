import axios from 'axios';

const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		// MARK: -- server
		return axios.create({
			baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers,
			withCredentials: true,
		});
	} else {
		// MARK: -- browser
		return axios.create({
			baseUrl: '/'
		});
	}
};

export default buildClient;