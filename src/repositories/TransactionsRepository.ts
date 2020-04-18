import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    balance = this.transactions.reduce((acc: Balance, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.value;
        balance.total += transaction.value;
      } else {
        acc.outcome += transaction.value;
        balance.total -= transaction.value;
      }
      return acc;
    }, balance);

    return balance;
  }

  public create({ type, title, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      type,
      title,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
