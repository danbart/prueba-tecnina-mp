const { poolPromise, sql } = require('../database/connection');

exports.obtenerCasos = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_obtener_casos');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener casos', details: err.message });
    }
};

exports.crearCaso = async (req, res) => {
    const { titulo, fiscal_id } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('titulo', sql.VarChar, titulo)
            .input('fiscal_id', sql.Int, fiscal_id)
            .execute('sp_crear_caso');
        res.status(201).json({ message: 'Caso creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear caso', details: err.message });
    }
};
