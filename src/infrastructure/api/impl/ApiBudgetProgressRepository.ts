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

                    if (item.expenses) {
                        item.expenses = item.expenses.map((expense: any) => {
                            return new ExpenseEntity(
                                expense.id ? expense.id : "",
                                expense.userId ? expense.userId : "",
                                expense.budgetId ? expense.budgetId : "",
                                expense.name ? expense.name : "",
                                expense.amount ? expense.amount : 0,
                                expense.createdAt ? expense.createdAt : new Date(),
                                expense.updatedAt ? expense.updatedAt : new Date(),
                            );
                        });
                    }


                    const entity = new BudgetProgressEntity(
                        item.id ? item.id : "",
                        item.userId ? item.userId : "",
                        item.budgetId ? item.budgetId : "",
                        item.currentAmount ? item.currentAmount : 0,
                        item.currentProgress ? item.currentProgress : 0,
                        item.month ? item.month : 0,
                        item.year ? item.year : 0,
                        item.expenses ? item.expenses : [],
                        item.createdAt ? item.createdAt : new Date(),
                        item.updatedAt ? item.updatedAt : new Date(),
                    );

                    entities.push(entity);

                });

                resolve(entities);


            }).catch((error) => { reject(error); });
        });
    }

}