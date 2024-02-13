import { v4 as uuidv4 } from 'uuid';

import { ITransaction } from '../models/transaction.model';
import database from '../database';

export async function insertTransaction({ transaction } : { transaction: Omit<ITransaction, 'id' | 'createdAt' | 'updatedAt'> }) {
  const { operationValue, operationType, description, clientId } = transaction;

  return database.query("INSERT INTO transaction (id, operation_value, operation_type, operation_description, client_id) VALUES ($1, $2, $3, $4, $5)", [uuidv4(), operationValue, operationType, description, clientId]);
}

export async function getTransactionsByClientId({ clientId } : { clientId: number }) {
  const output = await database.query("SELECT * FROM transaction WHERE client_id = $1 ORDER BY created_at DESC LIMIT 10", [clientId]);
  return output.rows.map(tr => ({
    operationValue: tr.operation_value,
    operationType: tr.operation_type,
    description: tr.operation_description,
    clientId: tr.client_id,
    createdAt: tr.created_at
  }));
}
