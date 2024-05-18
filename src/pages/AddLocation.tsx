import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddLocation() {

    const incidentURL = 'https://aidlink-q4mm.onrender.com/incident';
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cep: "",
        name: "",
        city: "",
        estado: "",
        description: "",
        latitude: "",
        longitude: "",
        image: "" // Adicionando o campo para a URL da imagem
    });

    //@ts-ignore
    const handleChangeCEP = async (e) => {
        const cep = e.target.value.replace(/\D/g, "");
        setFormData({
            ...formData,
            cep: cep
        });

        if (cep.length === 8) {
            fetchCityAndCoordinates(cep);
        }
    };

    const formatCEP = (cep: string) => {
        return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    };

    const fetchCityAndCoordinates = async (cep: string) => {
        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados pelo CEP");
            }
            const data = await response.json();
            if (data.city) {
                setFormData(prevState => ({
                    ...prevState,
                    city: data.city,
                    estado: data.state // Corrigindo para "state" ao invés de "estado"
                }));
                await fetchCoordinates(data.city);
            } else {
                throw new Error("Dados não encontrados para o CEP fornecido");
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
                    latitude: data[0].lat,
                    longitude: data[0].lon
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
            await fetch(incidentURL, {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            console.log("Formulário submetido:", formData);
            navigate('/');
        } catch (error) {
            console.error("Erro ao enviar dados do formulário:", error);
        }
    };

    return (
        <>
            <form className="m-auto card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">CEP</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu CEP"
                        onChange={handleChangeCEP}
                        onBlur={(e) => setFormData({ ...formData, cep: formatCEP(formData.cep) })}
                        className="input input-bordered"
                        value={formatCEP(formData.cep)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nome do local</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nome do Local"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input input-bordered"
                        value={formData.name}
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
                        <span className="label-text">Estado</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Estado"
                        value={formData.estado}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Latitude</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={formData.latitude}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Longitude</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={formData.longitude}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Descrição</span>
                    </label>
                    <textarea
                        placeholder="Descrição"
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
                        placeholder="URL da imagem"
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

export default AddLocation;
