import { query } from './lib/db.js';

export async function findByUsername(username) {
    const q = 'SELECT * FROM users WHERE username = $1';
  
    try {
      const result = await query(q, [username]);
  
      if (result.rowCount === 1) {
        return result.rows[0];
      }
    } catch (e) {
      console.error('Gat ekki fundið notanda eftir notendnafni');
      return null;
    }
  
    return false;
  }