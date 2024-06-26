import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoutes"
import Login from "../pages/Login";
import App from "../pages/App";
import { NonProtectedRoute } from "./NonProtectedRoute";
import Register from "../pages/Register";
import AddIncident from "../pages/AddIncident";
import AlterLocation from "../pages/AlterIncident";

const Routes = () => {
	//@ts-ignore
	const { token } = useAuth();
	const PublicRoutes = [
		{
			path: "/",
			element: (<App />),
		},
		{
			path: "about",
			element: <div>About</div>,
		},
	];
	const AuthenticatedRoutes = [
		{
			path: "/admin",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/admin",
					element: <div>User Home Page</div>,
				},
				{
					path: "/admin/profile",
					element: <div>User Profile</div>,
				},
				{
					path: "/admin/incidents",
					element: <AlterLocation />
				},
				{
					path: "/admin/add-incident",
					element: <AddIncident />
				},
				{
					path: "/admin/alter-incident",
					element: <AlterLocation />
				},
				
			],
		},
	];
	const NonAuthenticatedRoutes = [
		{
			path: "/login",
			element: <NonProtectedRoute />,
			children: [
				{
				path: "/login",
				element: (<Login />)
				}
			],
		},
		{
			path: "/register",
			element: <NonProtectedRoute />,
			children: [
				{
				path: "/register",
				element: (<Register />)
				}
			],
		},
	];

	const router = createBrowserRouter([
		...PublicRoutes,
		...(token ? AuthenticatedRoutes : []),
		...NonAuthenticatedRoutes,
	]);

	return <RouterProvider router={router} />;
};

export default Routes;