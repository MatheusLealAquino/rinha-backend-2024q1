import { v4 as uuidv4 } from 'uuid';

import { ITransaction } from '../models/transaction.model';
import database from '../database';

export async function insertTransaction({ transaction } : { transaction: Omit<ITransaction, 'id' | 'createdAt' | 'updatedAt'> }) {
  const { operationValue, operationType, description, clientId } = transaction;

  return database.query("INSERT INTO transaction (id, operation_value, operation_type, description, client_id) VALUES ($1, $2, $3, $4)", [uuidv4(), operationValue, operationType, description, clientId]);
}
