import { useState, useEffect } from 'react';
import axios from 'axios';

const IncidentList = () => {
    const [incidents, setIncidents] = useState([{
		name: '',
		description: ''
	}]);
    const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage após o login

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get(`https://aidlink-q4mm.onrender.com/incidentByUser/${token}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
				//@ts-ignore
                setIncidents(response.data.map(({name, description}) => ({
					name: name,
					description: description
				})));
            } catch (error) {
                console.error('Erro ao recuperar incidentes:', error);
            }
        };

        fetchIncidents();
    }, []);

    return (
        <div>
            <h2>Lista de Incidentes</h2>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.name}>{incident.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default IncidentList;
