const service = require('../services/casos.service');

exports.obtenerCasos = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearCaso = async (req, res) => {
    try {
        const { titulo, fiscalId } = req.body;
        const nuevo = await service.create({ id: null, titulo, fiscalId });
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateCaso = async (req, res) => {
    try {
        const { id, titulo, fiscalId } = req.body;
        const nuevo = await service.create({ id, titulo, fiscalId });
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.reasignarCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevoFiscalId } = req.body;
        const actualizado = await service.reassign(id, nuevoFiscalId);
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.actualizarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const actualizado = await service.updateStatus(id, estado);
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.history = async (req, res) => {
    const h = await service.history(req.params.id);
    res.json(h);
};
