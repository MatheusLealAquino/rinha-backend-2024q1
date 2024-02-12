import { ITransactionInput } from '../../models/transaction.model';
import * as clientRepository from '../../repositories/client.repository'

export async function createTransaction({ clientId, transactionInput } : { clientId: number, transactionInput: ITransactionInput }) {
  // operacão credito? atualizar cliente com novo valor e criar transação
  if (transactionInput.type === 'c') {
    return clientRepository.updateBalance({ clientId, balance: transactionInput.value });
  }

  const client = clientRepository.getById({ clientId });
  console.log(client);

// operação é debito?
// pegar saldo e valor do clientId
// saldo - transaction.value < -limite ? ok se não erro
// salva transacao 
// atualiza saldo
}
