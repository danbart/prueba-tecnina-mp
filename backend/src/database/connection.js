const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

async function waitPool(cfg, maxTries = 10, delayMs = 3000) {
    let tries = 0;
    while (true) {
        try {
            return await sql.connect(cfg);
        } catch (err) {
            if (++tries >= maxTries) throw err;
            console.log(`⏳ SQL no disponible, reintento ${tries}/${maxTries}…`);
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
}

async function ensureDatabase() {

    const masterPool = await waitPool({ ...config, database: 'master' });

    const { recordset } = await masterPool.request()
        .query("SELECT COUNT(*) AS n FROM sys.databases WHERE name = 'ministerio'");

    if (recordset[0].n === 0) {
        console.log('📀  Creando base de datos ministerio…');
        await masterPool.request().query('CREATE DATABASE ministerio');
    }

    await masterPool.close();
}

let poolPromise;

async function init() {
    if (!poolPromise) {
        await ensureDatabase();
        poolPromise = sql.connect({ ...config, database: 'ministerio' });
    }
    return poolPromise;
}

module.exports = {
    sql,
    poolPromise: init()
};

