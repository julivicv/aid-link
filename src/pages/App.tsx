import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import Donation from "../components/Donation"
import Navbar from "../components/Navbar"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { useEffect, useState } from "react"

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

	const marker = [
		[-29.27, -51.5244032],
		[-29.28, -51.5244032],
		[-29.29, -51.5244032],
		[-29.3, -51.5244032],
		[-29.241, -51.5244032],
	]

	const [center, setCenter] = useState([-30.0277, -51.2287]);

	const [loadingCoordinates, setLoadingCoordinates] = useState(true);

	const userLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position);

				setCenter([position.coords.latitude, position.coords.longitude]);
			}, () => {
				alert('Não foi possível encontrar sua localização')
			});
		} else {
			console.log("Geolocalização não suportada");
		}
		setLoadingCoordinates(false);
	}

	useEffect(() => {
		userLocation()
	}, [])

	function ChangeView() {
		const map = useMap();
		map.setView(center as LatLngTuple);
		return null;
	}

	return (
		<>
			<Navbar menuActions={menuActions} />
			<div className="overflow-hidden">
				{
					loadingCoordinates
						? (<></>)
						: (<MapContainer className="h-[calc(100dvh-52px)] z-0" center={center as LatLngExpression} zoom={13} scrollWheelZoom={true}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<ChangeView />
							<Marker position={center as LatLngExpression}>
										<Popup>
											<div className="drawer-content">
												<span>Sua localização aproximada</span>
											</div>
										</Popup>
									</Marker>
							{marker.map(m => {
								return (
									<Marker position={m as LatLngExpression}>
										<Popup>
											<div className="drawer-content">
												<label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Ver formas de doar</label>
											</div>
										</Popup>
									</Marker>
								)
							})}
						</MapContainer>)
				}
				<Donation pix={'teste'} />
			</div>
		</>
	)
}

export default App
