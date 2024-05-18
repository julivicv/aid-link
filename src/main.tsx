import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import './output.css'
import {
	createBrowserRouter,
	RouterProvider
  } from "react-router-dom";
import Login from './pages/Login.tsx'

  const router = createBrowserRouter([
	{
	  path: "/",
	  element: (<App />),
	},
	{
		path: "/login",
		element: (<Login />),
	},
	{
	  path: "about",
	  element: <div>About</div>,
	},
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
