import Link from 'next/link';

const Header = ({ currentUser }) => {

	const links = [
		!currentUser && { label: 'Sign Up', href: '/auth/signup' },
		!currentUser && { label: 'Sign In', href: '/auth/signin' },
		currentUser && { label: 'Sign Out', href: '/auth/signout' }
	]
	.filter(config => config)
	.map(({ label, href }) => {
		return <li className="nav-item" key={href}>
			<Link href={href}>
				<a className="nav-link">{label}</a>
			</Link>
		</li>
	});

	return <nav className="navbar navbar-light bg-light">
		<Link href="/">
			<a className="navbar-brand">eventspace</a>
		</Link>
		<div className="d-flex justify-content-end">
			<ul className="nav d-flex align-items-center">
				{links}
			</ul>
		</div>
	</nav>
}

export default Header