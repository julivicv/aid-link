import { useEffect, useState } from 'react';
import { Bread, DotsSixVertical, FirstAid, QuestionMark, SprayBottle, TShirt, Towel, Plus, ToiletPaper, Person } from "@phosphor-icons/react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QrCodePix } from "qrcode-pix";

export type donation = {
	id: string,
	icon: string,
	name: string,
	description: string
}

type props = {
	pix: string
}


function Donation(props: props) {
	const [qrCode, setQrCode] = useState<string>('');

	const [rawPix, setRawPix] = useState<string>('');

	const [pix, setPix] = useState<string>(props.pix);

	const [userRole, setUserRole] = useState<string>("owner");

	useEffect(() => {
		async function generateDynamicPix() {

			const qrCodePix = QrCodePix({
				version: '01',
				key: props.pix,
				name: props.pix,
				city: 'São Paulo',
			})

			const rawPixStr = qrCodePix.payload()
			const qrCodeBase64 = await qrCodePix.base64()

			setRawPix(rawPixStr)

			setQrCode(qrCodeBase64)
		}

		generateDynamicPix();
	}, [])


	const [donations, updateDonations] = useState([
			{
				id: '1',
				icon: 'food',
				name: 'Alimentos',
				description: 'Alimentos não perecíveis'
			},
			{
				id: '2',
				icon: 'pharma',
				name: 'Medicamentos',
				description: 'Medicamentos gerais'
			},
			{
				id: '3',
				icon: 'cleaning',
				name: 'Produtos de Limpeza',
				description: ''
			}, {
				id: '4',
				icon: 'selfCare',
				name: 'Produtos de Higiene Pessoal',
				description: ''
			},
			{
				id: '5',
				icon: 'clothes',
				name: 'Roupas',
				description: ''
			},
			{
				id: '6',
				icon: 'blankets',
				name: 'Cobertores',
				description: ''
			},
			{
				id: '7',
				icon: 'voluntaries',
				name: 'Voluntários',
				description: ''
			},
		]
	);


	const loadIcon = (icon: string) => {
		switch (icon) {
			case 'food':
				return <Bread size={32} />
			case 'pharma':
				return <FirstAid size={32} />
			case 'selfCare':
				return <ToiletPaper size={32} />
			case 'cleaning':
				return <SprayBottle size={32} />
			case 'clothes':
				return <TShirt size={32} />
			case 'blankets':
				return <Towel size={32} />
			case 'voluntaries':
				return <Person size={32} />
			default:
				return <QuestionMark size={32} />
		}
	}

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(donations);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateDonations(items);
	}

	const handleOnDragStart = () => {
		if (window.navigator.vibrate) {
			window.navigator.vibrate(100);
		}
	};

	const loadDonations = (role: string) => {
		return role === "owner"
			? (<div className="gap-2 flex flex-col overflow-y-scroll h-[calc(100vh-250px)]">
				<DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
					<Droppable droppableId="donations">
						{(provided) => (
							<div className="donations" {...provided.droppableProps} ref={provided.innerRef}>
								{donations.map(({ id, name, icon, description }, index) => {
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided, snapshot) => {
												if (snapshot.isDragging) {
													//@ts-ignore
													provided.draggableProps.style.left = provided?.draggableProps?.style?.offsetLeft;
													//@ts-ignore
													provided.draggableProps.style.top = provided?.draggableProps?.style?.offsetTop;
												}
												return (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														key={id}
														className="card card-side bg-base-100 shadow-xl mb-4">
														<div className="m-auto flex">
															<DotsSixVertical className="mx-3" size={32} weight="bold" />
															{loadIcon(icon)}
														</div>
														<div className="card-body py-2">
															<h2 className="card-title">{name}</h2>
															<p>{description}</p>
														</div>
													</div>)
											}}
										</Draggable>
									)
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<div className='flex flex-col gap-3 fixed bottom-4 right-4 w-[288px] bg-[var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))]'>
					<button onClick={() => console.log(donations)} className='btn btn-primary w-full text-2xl'>
						Salvar
					</button>
				</div>
			</div>)
			: <div>
				{donations.map(({ name, icon, description }) => (
					<div className="gap-2 flex flex-col">
						<div className="card card-side bg-base-100 shadow-xl mb-4">
							<div className="m-auto flex pl-6">
								{loadIcon(icon)}
							</div>
							<div className="card-body py-2">
								<h2 className="card-title">{name}</h2>
								<p>{description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
	}

	return (
		<>
			<div className="drawer drawer-end z-[2000]">
				<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
				<div className="drawer-side">
					<label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
						{
							userRole === "owner"
								? (<>
									<label className="label">
										<span className="label-text my-2 text-2xl font-bold">Chave PIX</span>
									</label>
									<input type="text" className="input input-bordered mb-4" placeholder="emailpix@gmail.com" onChange={(e) => setPix(e.target.value)} value={pix} />
								</>
								)
								: (
									<>
										<img className="w-[250px] h-[250px] mx-auto rounded-md" src={qrCode} alt={'QR Code PIX'}></img>
										<span className="mx-auto my-2 link link-hover">{props.pix}</span>
									</>
								)
						}
						<span className="my-2 text-2xl font-bold">Prioridades</span>
						{loadDonations(userRole)}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Donation
