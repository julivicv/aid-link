import { useState, useEffect } from 'react';
import axios from 'axios';

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage após o login

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get(`https://aidlink-q4mm.onrender.com/incidentByUser/${token}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIncidents(response.data);
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
