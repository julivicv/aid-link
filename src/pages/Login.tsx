import { CaretLeft } from "@phosphor-icons/react"
import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

function Login() {

	const loginURL = 'https://aidlink-q4mm.onrender.com/login'

	//@ts-ignore
	const { setToken } = useAuth();
	const navigate = useNavigate();

	const handleLogin = (token: string) => {
		setToken(token);
		navigate("/", { replace: true });
	  };

	const handleSubmit = async () => {
		console.log(formData);
		await fetch(loginURL, {
			method: "POST",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData)
		})
			.then(res => res.json())
			.then(data => {
				handleLogin(data.message);
			})
			.catch(Err => (console.log(Err)))
	}

	const [formData, setFormData] = useState({
		email: 'eduardo@qwer.com',
		password: 'qwerqwer'
	})

	return (
		<>
			<a role="button" href="../" className="btn btn-circle btn-outline m-4">
				<CaretLeft size={32} weight="bold" />
			</a>
			<span className="block text-3xl font-bold text-center pt-5">Login</span>
			<form className="m-auto card-body" onSubmit={() => { return false }}>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input type="email" placeholder="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input input-bordered" value={formData.email} required />
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Senha</span>
					</label>
					<input type="password" placeholder="senha" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input input-bordered" value={formData.password} required />
					{/* <label className="label">
						<a href="#" className="label-text-alt link link-hover">Esqueceu da senha?</a>
					</label> */}
				</div>
				<div className="form-control mt-6">
					<button onClick={() => handleSubmit()} type="button" className="btn btn-primary">Login</button>
				</div>
			</form>
		</>
	)
}

export default Login
