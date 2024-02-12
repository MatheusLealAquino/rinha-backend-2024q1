import database from '../database';
import { IClient } from '../models/client.model';

export async function updateBalance({ clientId, balance } : { clientId: number; balance: number }) {
  const output = await database().query("UPDATE client SET account_balance = account_balance + $1 WHERE id = $2 RETURNING *", [balance, clientId]);
  const user = output.rows[0];
  if (!user) return null;
  return { id: user.id, accountLimit: user.account_limit, accountBalance: user.account_balance } as IClient;
}

export async function getById({ clientId } : { clientId: number; }): Promise<IClient | null> {
  const output = await database().query("SELECT * from client WHERE id = $1", [clientId]);
  const user = output.rows[0];
  if (!user) return null;
  return { id: user.id, accountLimit: user.account_limit, accountBalance: user.account_balance } as IClient;
}

export async function getByIdWithValueCheck({ clientId, transactionValue } : { clientId: number; transactionValue: number; }): Promise<IClient | null> {
  const output = await database().query("SELECT * from client WHERE id = $1 AND account_balance - $2 >= - account_limit", [clientId, transactionValue]);
  const user = output.rows[0];
  if (!user) return null;
  return { id: user.id, accountLimit: user.account_limit, accountBalance: user.account_balance } as IClient;
}
