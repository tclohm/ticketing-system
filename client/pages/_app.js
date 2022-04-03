import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/header';
import App from 'next/app';

import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Header currentUser={currentUser}/>
			<Component {...pageProps} />
		</>
	)
};

AppComponent.getInitialProps = async (ctx) => {
	const { data } = await buildClient(ctx.ctx).get('/api/users/currentuser');
	let pageProps = {}
	return { pageProps, ...data }
}

export default AppComponent;