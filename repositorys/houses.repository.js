import { pool } from '../db.js';

export async function getAllHouses() {

    const result = await pool.query('SELECT * FROM houses');

    return result.rows; 
}


export async function getHouseById(id) {
    const one = await pool.query ("SELECT * FROM houses WHERE id = $1", [id]);

    if (one.rowCount === 0) {
        return null;
    } else {
        return one.rows[0];
    }
}

// House på teachers er tekst (fx "Gryffindor"), ikke id
export async function getHouseByName(name) {
    const one = await pool.query("SELECT * FROM houses WHERE name = $1", [name]);

    if (one.rowCount === 0) {
        return null;
    }
    return one.rows[0];
}