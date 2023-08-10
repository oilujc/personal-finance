import TransactionEntity from "../../../domain/entities/TransactionEntity";
import ExpenseEntity from "../../../domain/entities/ExpenseEntity";
import ITransactionRepository from "../../../domain/repositories/ITransactionRepository";
import api from "../api";
import IncomeEntity from "../../../domain/entities/IncomeEntity";
import TransferEntity from "../../../domain/entities/TransferEntity";

export default class ApiTransactionRepository implements ITransactionRepository {

    private collectionName = "transactions";


    find(qs: any): Promise<TransactionEntity[]> {
        return new Promise((resolve, reject) => {

            api.get(`/${this.collectionName}`, {
                params: {
                    limit: qs.limit ? qs.limit : 5
                },
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entities: TransactionEntity[] = [];

                data.forEach((item: any) => {

                    const entity = TransactionEntity.fromObject(item);
                    entities.push(entity);

                });

                resolve(entities);


            }).catch((error) => { reject(error); });
        });
    }

}