import {Footer, Navbar, Transactions, WebServices, Welcome} from '../components/index.js'

const Home = () => {
	return (
		<div className='min-h-screen '>
		<div className="gradient-bg-welcome">
			<Navbar/>
			<Welcome/>
		</div>
		<WebServices/>
		<Transactions/>
		<Footer />
	</div>
	)
}

export default Home