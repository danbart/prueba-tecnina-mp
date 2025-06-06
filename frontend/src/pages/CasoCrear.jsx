import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CasoCrear() {
    const nav = useNavigate();
    const [form, setForm] = useState({ titulo: '', fiscalId: '' });
    const [err, setErr] = useState('');
    const [users, setUsers] = useState([]);

    const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async e => {
        e.preventDefault();
        try {
            console.log("🚀 ~ CasoCrear ~ orm.fiscalId:", { titulo: form.titulo, fiscalId: Number(form.fiscalId) })
            await api.post('/casos', { titulo: form.titulo, fiscalId: Number(form.fiscalId) });
            nav('/casos');
        } catch (e) {
            setErr(e.response?.data?.error || 'Error');
        }
    };

    useEffect(() => {
        api.get('/users')
            .then(r => setUsers(r.data))
            .catch(e => setErr(e.response?.data?.error || 'Error al cargar usuarios'));
    }
        , []);

    return (
        <div className="flex flex-col items-center mt-16">
            <h1 className="text-2xl font-bold mb-4">Nuevo caso</h1>
            <form onSubmit={submit} className="flex flex-col gap-4 w-80">
                <input name="titulo" placeholder="Título" className="border p-2 rounded" value={form.titulo} onChange={handle} />
                <select name="fiscalId" className="border p-2 rounded" value={form.fiscalId} onChange={handle}>
                    <option value="">Seleccionar Fiscal</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.nombre} ({u.rol})</option>
                    ))}
                </select>
                {err && <p className="text-red-500 text-sm">{err}</p>}
                <button className="bg-blue-600 text-white rounded p-2">Guardar</button>
            </form>
        </div>
    );
}