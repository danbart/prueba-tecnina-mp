import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Casos() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        api.get('/casos')
            .then(r => setData(r.data))
            .catch(e => setError(e.response?.data?.error || 'Error'));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Casos</h2>
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Título</th>
                        <th className="p-2 border">Estado</th>
                        <th className="p-2 border">Fiscal</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="p-2 border text-center">
                                <Link to={`/casos/${c.id}`} className="text-blue-600 underline">{c.id}</Link>
                            </td>
                            <td className="p-2 border">{c.titulo}</td>
                            <td className="p-2 border">{c.estado}</td>
                            <td className="p-2 border">{c.fiscalId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
