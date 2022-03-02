import 'bootstrap/dist/css/bootstrap.css';

const CustomApp = ({ Component, pageProps }) => {
	return (
		<div>
			<h1>header</h1>
			<Component {...pageProps} />
		</div>
	)
}

export default CustomApp;