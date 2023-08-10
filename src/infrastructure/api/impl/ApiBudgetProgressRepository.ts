import BudgetProgressEntity from "../../../domain/entities/BudgetProgressEntity";
import ExpenseEntity from "../../../domain/entities/ExpenseEntity";
import IBudgetProgressRepository from "../../../domain/repositories/IBudgetProgressRepository";
import api from "../api";

export default class ApiBudgetProgressRepository implements IBudgetProgressRepository {

    private collectionName = "budget-progress";


    create(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity> {
        throw new Error("Method not implemented.");
    }
    update(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<BudgetProgressEntity> {
        throw new Error("Method not implemented.");
    }
    find(qs: any): Promise<BudgetProgressEntity[]> {
        return new Promise((resolve, reject) => {

            api.get(`/${this.collectionName}`, {
                params: {
                    limit: qs.limit ? qs.limit : 10,
                    offset: qs.offset ? qs.offset : 0,
                    orderBy: qs.orderBy ? qs.orderBy : "id",
                    order: qs.order ? qs.order : "asc",
                },
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entities: BudgetProgressEntity[] = [];

                data.forEach((item: any) => {

                    const entity = BudgetProgressEntity.fromObject(item);
                    entities.push(entity);

                });

                resolve(entities);


            }).catch((error) => { reject(error); });
        });
    }

}