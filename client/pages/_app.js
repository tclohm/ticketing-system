import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</div>
	)
		
	
};

AppComponent.getInitialProps = async (ctx) => {
	const { data } = await buildClient(ctx.ctx).get('/api/users/currentuser');
	let pageProps = {};

	if (ctx.Component.getInitialProps) {
		//pageProps = await ctx.Component.getServerSideProps(ctx.ctx)
	}
	
	return {
		pageProps,
		...data
	}
}

export default AppComponent;