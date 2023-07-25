import IExpenseRepository from "../../../domain/repositories/IExpenseRepository";
import ExpenseEntity from "../../../domain/entities/ExpenseEntity";
import api from "../api";

export default class ApiExpenseRepository implements IExpenseRepository {

    private collectionName = "expenses";

    create(expense: ExpenseEntity): Promise<ExpenseEntity> {
        return new Promise((resolve, reject) => {
            api.post(`/${this.collectionName}`, {
                'accountId': expense.accountId,
                'budgetId': expense.budgetId,
                'name': expense.name,
                'note': expense.note,
                'amount': expense.amount,
                'date': expense.date,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new ExpenseEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.accountId ? data.accountId : "",
                    data.budgetId ? data.budgetId : "",
                    data.name ? data.name : "",
                    data.note ? data.note : "",
                    data.amount ? data.amount : 0,
                    data.date ? data.date : null,
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
           
        });
    }
    update(income: ExpenseEntity): Promise<ExpenseEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            api.delete(`/${this.collectionName}/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                resolve(true);

            }).catch((error) => {
                reject(error);
            });
       
        });
    }
    getById(id: string): Promise<ExpenseEntity | null> {
        return new Promise((resolve, reject) => {

            api.get(`/${this.collectionName}/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new ExpenseEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.accountId ? data.accountId : "",
                    data.budgetId ? data.budgetId : "",
                    data.name ? data.name : "",
                    data.note ? data.note : "",
                    data.amount ? data.amount : 0,
                    data.date ? data.date : null,
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
        });    
    }
    find(qs: any): Promise<ExpenseEntity[]> {
        return new Promise((resolve, reject) => {

          
            api.get(`/${this.collectionName}`, {
                params: {
                    limit: qs.limit ? qs.limit : 10,
                    offset: qs.offset ? qs.offset : 0,
                    orderBy: qs.orderBy ? qs.orderBy : "created_at",
                    order: qs.order ? qs.order : "desc",
                },
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entities: ExpenseEntity[] = [];

                data.forEach((item: any) => {

                    const entity = new ExpenseEntity(
                        item.id ? item.id : "",
                        item.userId ? item.userId : "",
                        item.accountId ? item.accountId : "",
                        item.budgetId ? item.budgetId : "",
                        item.name ? item.name : "",
                        item.note ? item.note : "",
                        item.amount ? item.amount : 0,
                        item.date ? item.date : null,
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