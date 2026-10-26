const { Client } = require("pg");
require("dotenv").config();

async function executarSQL(query, params = []) {
    const client = new Client({
        user: process.env.DB_USER || process.env.PGUSER,
        host: process.env.DB_HOST || process.env.PGHOST,
        database: process.env.DB_DATABASE || process.env.DB_NAME || process.env.PGDATABASE,
        password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
        port: process.env.DB_PORT || process.env.PGPORT || 5432,
    });

    try {
        await client.connect();
        const resultado = await client.query(query, params);
        return resultado.rows;
    } catch (erro) {
        console.error("Erro ao executar SQL:", erro);
        throw erro;
    } finally {
        await client.end();
    }
}

module.exports = {
    executarSQL,
};
