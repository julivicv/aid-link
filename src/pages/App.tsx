import Navbar from "../components/Navbar"

function App() {

	const menuActions = [
		{
			link: './',
			actionText: 'test'
		},
		{
			link: './',
			actionText: 'test'
		}
	]

	return (
		<>
			<Navbar menuActions={menuActions} />
			<div>
				Content
			</div>
		</>
	)
}

export default App
