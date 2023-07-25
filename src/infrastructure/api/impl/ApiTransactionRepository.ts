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
                    limit: qs.limit ? qs.limit : 10
                },
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entities: TransactionEntity[] = [];

                data.forEach((item: any) => {

                    let itemEntity = null;

                    if (item.type === "expense") {
                        itemEntity = new ExpenseEntity(
                            item.item.id ? item.item.id : "",
                            item.item.userId ? item.item.userId : "",
                            item.item.accountId ? item.item.accountId : "",
                            item.item.budgetId ? item.item.budgetId : "",
                            item.item.name ? item.item.name : "",
                            item.item.note ? item.item.note : "",
                            item.item.amount ? item.item.amount : 0,
                            item.item.date ? item.item.date : null,
                            item.item.createdAt ? item.item.createdAt : new Date(),
                            item.item.updatedAt ? item.item.updatedAt : new Date(),
                        );
                    }

                    if (item.type === "income") {
                        itemEntity = new IncomeEntity(
                            item.item.id ? item.item.id : "",
                            item.item.userId ? item.item.userId : "",
                            item.item.accountId ? item.item.accountId : "",
                            item.item.name ? item.item.name : "",
                            item.item.note ? item.item.note : "",
                            item.item.amount ? item.item.amount : 0,
                            item.item.date ? item.item.date : null,
                            item.item.createdAt ? item.item.createdAt : new Date(),
                            item.item.updatedAt ? item.item.updatedAt : new Date(),
                        );
                    }

                    if (item.type === "transfer") {
                        itemEntity = new TransferEntity(
                            item.item.id ? item.item.id : "",
                            item.item.userId ? item.item.userId : "",
                            item.item.fromAccountId ? item.item.fromAccountId : "",
                            item.item.toAccountId ? item.item.toAccountId : "",
                            item.item.amount ? item.item.amount : 0,
                            item.item.name ? item.item.name : "",
                            item.item.createdAt ? item.item.createdAt : new Date(),
                            item.item.updatedAt ? item.item.updatedAt : new Date(),
                        );
                    }

                    const entity = new TransactionEntity(
                        item.type ? item.type : "",
                        itemEntity ? itemEntity : null,
                    );

                    entities.push(entity);

                });

                resolve(entities);


            }).catch((error) => { reject(error); });
        });
    }

}