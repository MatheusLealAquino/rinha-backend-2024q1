export interface ITransaction {
  id: string;
  operationValue: number;
  operationType: 'c' | 'd';
  description: string;
  clientId: number;
  createdAt: Date;
}

export interface ITransactionInput {
  type: 'c' | 'd';
  value: number;
  description: string;
}
