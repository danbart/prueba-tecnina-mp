import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { estados } from '../utils/const';

export default function CasoDetalle() {
    const { id } = useParams();
    const [caso, setCaso] = useState(null);
    const [error, setError] = useState('');
    const [historial, setHistorial] = useState([]);
    const [users, setUsers] = useState([]);

    const reasignarFiscal = async (nuevoFiscalId) => {
        try {
            await api.put(`/casos/${id}/reasignar`, { nuevoFiscalId });
            setCaso(prev => ({ ...prev, fiscalId: nuevoFiscalId }));
            getData();
        } catch (e) {
            setError(e.response?.data?.error || 'Error al reasignar fiscal');
        }
    }
    const actualizarEstado = async (nuevoEstado) => {
        try {
            await api.patch(`/casos/${id}/estado`, { estado: nuevoEstado });
            setCaso(prev => ({ ...prev, estado: nuevoEstado }));
            getData();
        } catch (e) {
            setError(e.response?.data?.error || 'Error al actualizar estado');
        }
    }

    useEffect(() => {
        getData();
        api.get('/users')
            .then(r => setUsers(r.data))
            .catch(e => setErr(e.response?.data?.error || 'Error al cargar usuarios'));
    }, [id]);

    const getData = async () => {
        api.get(`/casos`).then(r => {
            const found = r.data.find(x => x.id === Number(id));
            if (found) setCaso(found);
            else setError('No encontrado');
        }).catch(e => setError(e.response?.data?.error || 'Error'));
        api.get(`/casos/${id}/historial`).then(r => {
            setHistorial(r.data);
        }
        ).catch(e => setError(e.response?.data?.error || 'Error al cargar historial'));
    }

    if (error) return <p className="p-4 text-red-500">{error}</p>;
    if (!caso) return <p className="p-4">Cargando…</p>;

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Caso {caso.id}</h2>
                <p><strong>Título:</strong> {caso.titulo}</p>
                <p><strong>Estado:</strong> {caso.estado}</p>
                <p><strong>Fiscal:</strong> {caso.nombre} - {caso.email}</p>
                <p><strong>Fecha de creación:</strong> {moment(caso.fechaCreacion).format('DD/MM/yyyy')}</p>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Historial</h3>
                <ul className="list-disc pl-5">
                    {historial.length > 0 ? historial.map((h, index) => (
                        <li key={index}>
                            {moment(h.fecha).format('DD/MM/yyyy HH:mm')} - {h.estado}
                        </li>
                    )) : <li>No hay historial disponible</li>}
                </ul>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Reasignar Fiscal</h3>
                <select id='nuevoFiscalId'
                    name="nuevoFiscalId" className="border p-2 rounded" >
                    <option value="">Seleccionar Fiscal</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.nombre} ({u.rol})</option>
                    ))}
                </select>
                <button
                    className="bg-blue-600 text-white rounded p-2"
                    onClick={() => reasignarFiscal(nuevoFiscalId.value)}
                >
                    Reasignar
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Actualizar Estado</h3>
                <select id='nuevoEstado'
                    name="nuevoEstado" className="border p-2 rounded" >
                    <option value="">Seleccionar Estado</option>
                    {estados.map(u => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                </select>
                <button
                    className="bg-green-600 text-white rounded p-2"
                    onClick={() => actualizarEstado(nuevoEstado.value)}
                >
                    Actualizar
                </button>
            </div>
        </>
    );
}