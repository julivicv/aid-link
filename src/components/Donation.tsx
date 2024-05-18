import { useState } from 'react';
import { Bread, DotsSixVertical, FirstAid, QuestionMark, SprayBottle, TShirt, Towel, } from "@phosphor-icons/react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export type donation = {
	id: string,
	icon: string,
	name: string,
	description: string
}

type props = {
	pix: string,
	donations: Array<donation>
}




function Donation(props: props) {

	const [donations, updateDonations] = useState(props.donations);


	const loadIcon = (icon: string) => {
		switch (icon) {
			case 'food':
				return <Bread size={32} />
			case 'pharma':
				return <FirstAid size={32} />
			case 'cleaning':
				return <SprayBottle size={32} />
			case 'clothes':
				return <TShirt size={32} />
			case 'blankets':
				return <Towel size={32} />
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

	const loadDonations = () => {
		return <div className="gap-2 flex flex-col">
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
		</div>
	}

	return (
		<>
			<div className="drawer drawer-end">
				<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					<label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
						<img className="w-[250px] h-[250px] mx-auto bg-white"></img>
						<span className="mx-auto my-2 link link-hover">{props.pix}</span>
						{loadDonations()}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Donation
