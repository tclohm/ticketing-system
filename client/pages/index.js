const Root = ({ color }) => {
	console.log(color)
	return <h1>Root</h1>
}

Root.getInitialProps = async (ctx) => {
	return {
		color: 'orange'
	}
}

export default Root