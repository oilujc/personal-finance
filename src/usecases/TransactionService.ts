import TransactionEntity from "../domain/entities/TransactionEntity";
import ITransactionRepository from "../domain/repositories/ITransactionRepository";


export interface ITransactionService {
    find(
        qs: any,
    ): Promise<TransactionEntity[]>;
}

export default class TransactionService implements ITransactionService {


    private transactionRepository: ITransactionRepository;

    constructor(
        transactionRepository: ITransactionRepository,
    ) {
        this.transactionRepository = transactionRepository;
    }

    async find(
        qs: any,
    ): Promise<TransactionEntity[]> {
        return this.transactionRepository.find(qs);
    }

}