import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";

function AddIncident() {
    //@ts-ignore
    const { token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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


    //@ts-ignore
    const handleChangecep = async (e) => {
        const cep = e.target.value.replace(/\D/g, "");
        setFormData({
            ...formData,
            cep: cep
        });

        if (cep.length === 8) {
            fetchCityAndCoordinates(cep);
        }
    };

    const formatcep = (cep: string) => {
        return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    };

    const fetchCityAndCoordinates = async (cep: string) => {
        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados pelo cep");
            }
            const data = await response.json();
            if (data.city) {
                setFormData(prevState => ({
                    ...prevState,
                    city: data.city,
                    state: data.state
                }));
                await fetchCoordinates(data.city);
            } else {
                throw new Error("Dados não encontrados para o cep fornecido");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const fetchCoordinates = async (city: string) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar coordenadas da cidade");
            }
            const data = await response.json();
            if (data.length > 0) {
                setFormData(prevState => ({
                    ...prevState,
                    lat: data[0].lat,
                    long: data[0].lon
                }));
            } else {
                throw new Error("Coordenadas não encontradas para a cidade");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { cep, lat, long, ...formDataToSend } = formData;
            const formDataWithNumbers = {
                ...formDataToSend,
                zip: parseInt(cep.replace(/\D/g, ""), 10),
                lat: parseFloat(lat),
                long: parseFloat(long)
            };
            await axios.post("https://aidlink-q4mm.onrender.com/incident", {
                "name": "Desmoronamento no Rio das Antas",
                "address": "Rua de Teste do Desmoronamento",
                "city": "Bento Gonçalves",
                "state": "Rio Grande do Sul",
                "zip": 95700000,
                "description": "Ocorreu um deslizamento de terra, ocasionando a interrupção das estradas",
                "lat": 123,
                "long": 456,
                "image": "testeurl"
            });
            console.log("Formulário submetido:", formDataWithNumbers);
            navigate('/');
        } catch (error) {
            console.error("Erro ao enviar dados do formulário:", error);
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
                        <span className="label-text">Nome do Incidente</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome do ncidente"
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
                        placeholder="Digite seu endereço"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="input input-bordered"
                        value={formData.address}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">cep</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu cep"
                        onChange={handleChangecep}
                        onBlur={(e) => setFormData({ ...formData, cep: formatcep(formData.cep) })}
                        className="input input-bordered"
                        value={formatcep(formData.cep)}
                        maxLength={9}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cidade</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Cidade"
                        value={formData.city}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">state</span>
                    </label>
                    <input
                        type="text"
                        placeholder="state"
                        value={formData.state}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">lat</span>
                    </label>
                    <input
                        type="text"
                        placeholder="lat"
                        value={formData.lat}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">long</span>
                    </label>
                    <input
                        type="text"
                        placeholder="long"
                        value={formData.long}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Descrição</span>
                    </label>
                    <textarea
                        placeholder="Digite uma descrição para o incidente"
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
                    <button type="submit" className="btn btn-primary">Cadastrar Local</button>
                </div>
            </form>
        </>
    );
}

export default AddIncident;
