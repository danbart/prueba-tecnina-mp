const Caso = require('../models/Caso');

// arreglo mock para desarrollo
const _db = [];
let _seq = 1;

function _findIndex(id) {
    return _db.findIndex(c => c.id === Number(id));
}

const casosService = {
    getAll: async () => {
        // TODO: reemplazar por EXEC sp_obtener_casos
        return [..._db];
    },

    /** crea un caso y lo devuelve */
    create: async ({ titulo, fiscalId }) => {
        // TODO: ejecutar sp_crear_caso
        const nuevo = new Caso({ id: _seq++, titulo, fiscalId });
        _db.push(nuevo);
        return nuevo;
    },

    reassign: async (idCaso, nuevoFiscalId) => {
        // TODO: ejecutar sp_reasignar_caso
        const idx = _findIndex(idCaso);
        if (idx === -1) throw new Error('Caso no encontrado');
        if (_db[idx].estado !== 'pendiente') throw new Error('Solo se puede reasignar si el estado es pendiente');
        _db[idx].fiscalId = nuevoFiscalId;
        return _db[idx];
    },

    updateStatus: async (idCaso, nuevoEstado) => {
        // TODO: ejecutar sp_actualizar_estado_caso
        const idx = _findIndex(idCaso);
        if (idx === -1) throw new Error('Caso no encontrado');
        _db[idx].estado = nuevoEstado;
        return _db[idx];
    }
};

module.exports = casosService;