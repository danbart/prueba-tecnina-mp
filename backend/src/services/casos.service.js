const { poolPromise, sql } = require('../database/connection');
const Caso = require('../models/Caso');

// arreglo mock para desarrollo
const _db = [];
let _seq = 1;

function _findIndex(id) {
    return _db.findIndex(c => c.id === Number(id));
}

const casosService = {
    getAll: async () => {
        const pool = await poolPromise;
        const { recordset } = await pool.request().execute('sp_obtener_casos');
        return recordset;
    },

    /** crea un caso y lo devuelve */
    create: async ({ id, titulo, fiscalId }) => {
        const pool = await poolPromise;
        const { recordset } = await pool.request()
            .input('id', sql.Int, id)
            .input('titulo', sql.NVarChar, titulo)
            .input('fiscalId', sql.Int, fiscalId)
            .execute('sp_crear_caso');
        return recordset[0];
    },
    reassign: async (idCaso, nuevoFiscalId) => {
        const pool = await poolPromise;
        await pool.request()
            .input('id_caso', sql.Int, idCaso)
            .input('nuevo_fiscal', sql.Int, nuevoFiscalId)
            .execute('sp_reasignar_caso');
    },

    updateStatus: async (idCaso, nuevoEstado) => {
        const pool = await poolPromise;
        await pool.request()
            .input('id_caso', sql.Int, idCaso)
            .input('estado', sql.NVarChar, nuevoEstado)
            .execute('sp_actualizar_estado_caso');
    },
    history: async id => {
        const pool = await poolPromise;
        const { recordset } = await pool.request()
            .input('id_caso', sql.Int, id)
            .execute('sp_historial_caso');
        return recordset;
    }
};

module.exports = casosService;