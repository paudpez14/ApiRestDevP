import sql from "mssql";
const dbConfig = {
    server: 'localhost',
    user: 'PaulD',
    password: 'root123',
    database: 'DevPaulN',
    options:{
        encrypt:true,
        trustServerCertificate:true,
    }
};
export async function getConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;    
    } catch (error) {
        console.error(error);
    }
}
getConnection();