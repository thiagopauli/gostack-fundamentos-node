import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {
    if (type !== 'outcome' && type !== 'income') {
      throw Error('Type unrecognized, it should be "outcome" or "income".');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error('Insufficient funds.');
    }

    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
