import database from '../database';

export async function updateBalance({ clientId, balance } : { clientId: number; balance: number }) {
  return database.query("UPDATE client SET accountBalance = accountBalance + $1 WHERE id = $2", [balance, clientId]);
}

export async function getById({ clientId } : { clientId: number; }) {
  const output = await database.query("SELECT * from client WHERE id = $1", [clientId]);
  return output.rows[0];
}

