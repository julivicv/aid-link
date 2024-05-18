import { DotsThreeOutline, List } from "@phosphor-icons/react"
import { useState } from "react";

type menuActions = [{
	link: string,
	actionText: string
}]

function Navbar(props: any) {

	const loadMenuContents = (menuActions: menuActions, className: string, isDrawer: boolean = false) => {
		const actions = menuActions.map(e => (<li><a href={e.link}>{e.actionText}</a></li>));
		return (<ul className={className}>
			{isDrawer ? <div className="p-2 mr-2">Aid Link</div> : ''}
			{actions}
		</ul>)
	}

	const loadContextMenu = (isLogged: boolean) => {
		return isLogged
			? (
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost">
						<DotsThreeOutline size={32} weight="duotone" />
					</div>
					<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
						<li><a id="profile" href="#">Perfil</a></li>
						<li><a id="logout" href="#" onClick={() => setLogged(false)}>Deslogar</a></li>
					</ul>
				</div>
			)
			: (<a id="login" role="button" className="px-3 btn btn-ghost" href="./login" onClick={() => setLogged(true)}>Logar</a>)
	}

	const [isLogged, setLogged] = useState(false)

	return (
		<>
			<div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col">
					{/* Navbar */}
					<div className="w-full navbar bg-base-300 pr-4">
						<div className="flex-none lg:hidden">
							<label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
								<List size={32} />
							</label>
						</div>
						<div className="flex-1 px-2 mx-2">Aid Link</div>
						<div className="flex-none hidden lg:block">
							{loadMenuContents(props.menuActions, "menu menu-horizontal")}
						</div>
						<div className="flex-none">
							{loadContextMenu(isLogged)}
						</div>
					</div>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
					{loadMenuContents(props.menuActions, "menu p-4 w-60 min-h-full bg-base-200", true)}
				</div>
			</div>
		</>
	)
}

export default Navbar
