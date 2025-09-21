import mysql2 from 'mysql2';

export const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario
    password: '12345678', // Cambia por tu contraseña
    database: 'andelog' // Cambia por tu base de datos
});
