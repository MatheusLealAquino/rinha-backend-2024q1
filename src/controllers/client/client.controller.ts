import { ITransactionInput } from '../../models/transaction.model';
import * as clientRepository from '../../repositories/client.repository'
import * as transactionRepository from '../../repositories/transaction.repository'

export async function createTransaction({ clientId, transactionInput } : { clientId: number, transactionInput: ITransactionInput }) {
  if (transactionInput.type === 'd') {
    const client = await clientRepository.getById({ clientId });
    if (!client) throw new Error('Client not found');
    const clientWithValue = await clientRepository.getByIdWithValueCheck({ clientId, transactionValue: transactionInput.value });
    if (!clientWithValue) throw new Error('Inconsistency operation');
  }

  await transactionRepository.insertTransaction({
    transaction: {
      clientId,
      description: transactionInput.description,
      operationType: transactionInput.type,
      operationValue: transactionInput.value
    }
  });

  const transactionValue = transactionInput.type === 'c' ? transactionInput.value : - transactionInput.value;
  const updated = await clientRepository.updateBalance({ clientId, balance: transactionValue });

  return {
    limite: updated?.accountLimit,
    saldo: updated?.accountBalance
  }
}

export async function getExtract({ clientId } : { clientId: number }) {
  const client = await clientRepository.getById({ clientId });
  if (!client) throw new Error('Client not found');
  const transactions = await transactionRepository.getTransactionsByClientId({ clientId });

  return {
    saldo: {
      total: client.accountBalance,
      data_extrato: new Date().toISOString(),
      limite: client.accountLimit
    },
    ultimas_transacoes: transactions.map(tr => ({
      valor: tr.operationValue,
      tipo: tr.operationType,
      descricao: tr.description,
      realizada_em: new Date(tr.createdAt).toISOString()
    }))
  }
}
