import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";

function AlterIncident() {
    const incidentURL = 'https://aidlink-q4mm.onrender.com/incident';
    //@ts-ignore
    const { token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        cep: "",
        name: "",
        city: "",
        state: "",
        description: "",
        lat: "",
        long: "",
        image: "",
        address: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${incidentURL}/${formData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token de autenticação no cabeçalho da requisição
                }
            });
            const existingData = response.data;

            setFormData(existingData);
        } catch (error) {
            console.error("Erro ao buscar dados existentes:", error);
        }
    };

    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, ...formDataToSend } = formData;

            // Modifica os dados existentes com os novos dados do formulário
            const updatedData = {
                ...formDataToSend,
                cep: formData.cep,
                name: formData.name,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                description: formData.description,
                lat: formData.lat,
                long: formData.long,
                image: formData.image
            };

            // Envia os dados atualizados para o backend
            await axios.put(`${incidentURL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token de autenticação no cabeçalho da requisição
                }
            });

            console.log("Formulário atualizado:", updatedData);
            navigate('/'); // Redireciona para a página inicial após a atualização ser realizada
        } catch (error: any) {
            console.error("Erro ao atualizar o formulário:", error);
            if (error.response) {
                console.error("Resposta do servidor:", error.response.data);
            }
        }
    };

    return (
        <>
            <form className="m-auto card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nome do Local</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome do local"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input input-bordered"
                        value={formData.name}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Endereço</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o endereço"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="input input-bordered"
                        value={formData.address}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">CEP</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o CEP"
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                        className="input input-bordered"
                        value={formData.cep}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cidade</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite a cidade"
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="input input-bordered"
                        value={formData.city}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Estado</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o estado"
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="input input-bordered"
                        value={formData.state}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Descrição</span>
                    </label>
                    <textarea
                        placeholder="Digite a descrição"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="textarea textarea-bordered"
                        value={formData.description}
                        required
                    ></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">URL da Imagem</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite a URL da imagem"
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="input input-bordered"
                        value={formData.image}
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Atualizar Local</button>
                </div>
            </form>
        </>
    );
}

export default AlterIncident;
