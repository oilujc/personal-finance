import TransactionEntity from "../entities/TransactionEntity";

export default interface ITransactionRepository {
    
    find(
        qs: any,
    ): Promise<TransactionEntity[]>;

}