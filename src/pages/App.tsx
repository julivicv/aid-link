import Navbar from "../components/Navbar"
import Donation, { donation } from "../components/Donation"

function App() {

	const menuActions = [
		{
			link: './',
			actionText: 'test'
		},
		{
			link: './admins/incidents',
			actionText: 'Incidentes'
		}
	]

	const donations:Array<donation> = [
		{
			id: '1',
			icon: 'clothes',
			name: 'Roupas',
			description: 'roupas de inverno'
		},
		{
			id: '2',
			icon: 'pharma',
			name: 'Medicamentos',
			description: 'medicamentos gerais'
		},
		{
			id: '3',
			icon: 'blankets',
			name: 'Cobertores',
			description: ''
		},{
			id: '4',
			icon: 'clothes',
			name: 'Roupas',
			description: 'roupas de inverno'
		},
		{
			id: '5',
			icon: 'pharma',
			name: 'Medicamentos',
			description: 'medicamentos gerais'
		},
		{
			id: '6',
			icon: 'blankets',
			name: 'Cobertores',
			description: ''
		},{
			id: '7',
			icon: 'clothes',
			name: 'Roupas',
			description: 'roupas de inverno'
		},
		{
			id: '8',
			icon: 'pharma',
			name: 'Medicamentos',
			description: 'medicamentos gerais'
		},
		{
			id: '9',
			icon: 'blankets',
			name: 'Cobertores',
			description: ''
		},{
			id: '10',
			icon: 'clothes',
			name: 'Roupas',
			description: 'roupas de inverno'
		},
		{
			id: '11',
			icon: 'pharma',
			name: 'Medicamentos',
			description: 'medicamentos gerais'
		},
		{
			id: '12',
			icon: 'blankets',
			name: 'Cobertores',
			description: ''
		},{
			id: '13',
			icon: 'clothes',
			name: 'Roupas',
			description: 'roupas de inverno'
		},
		{
			id: '14',
			icon: 'pharma',
			name: 'Medicamentos',
			description: 'medicamentos gerais'
		},
		{
			id: '15',
			icon: 'blankets',
			name: 'Cobertores',
			description: ''
		},
	]

	return (
		<>
			<Navbar menuActions={menuActions} />
			<div>
				<Donation pix={'teste'} donations={donations}/>
			</div>
		</>
	)
}

export default App
