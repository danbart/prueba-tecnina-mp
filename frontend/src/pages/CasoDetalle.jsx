import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function CasoDetalle() {
    const { id } = useParams();
    const [caso, setCaso] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/casos`).then(r => {
            const found = r.data.find(x => x.id === Number(id));
            if (found) setCaso(found);
            else setError('No encontrado');
        }).catch(e => setError(e.response?.data?.error || 'Error'));
    }, [id]);

    if (error) return <p className="p-4 text-red-500">{error}</p>;
    if (!caso) return <p className="p-4">Cargando…</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Caso {caso.id}</h2>
            <p><strong>Título:</strong> {caso.titulo}</p>
            <p><strong>Estado:</strong> {caso.estado}</p>
            <p><strong>Fiscal:</strong> {caso.fiscalId}</p>
        </div>
    );
}