import pg from 'pg';

async function connect() {
    //esse if e para evitar de toda vez q a função connect for chamada sempre criar uma nova instancia db
    if (global.connection) {
        return global.connection.connect();
    }
    // Criação da instancia do db
    const pool = new pg.Pool({
        connectionString:
            'postgres://eojqncpf:egLvf5H0NbCCbbqHNgORjpqnRJYNZExp@fanny.db.elephantsql.com/eojqncpf',
    });
    // Deixando a instancia como variavel global pra o IF acima
    global.connection = pool;

    return pool.connect();
}

export { connect };
