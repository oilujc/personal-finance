import BudgetEntity from "../../../domain/entities/BudgetEntity";
import IBudgetRepository from "../../../domain/repositories/IBudgetRepository";
import api from "../api";

export default class ApiBudgetRepository implements IBudgetRepository {

    private collectionName = "budgets";

    create(budget: BudgetEntity): Promise<BudgetEntity> {
        return new Promise((resolve, reject) => {

            api.post(`/${this.collectionName}`, {
                'name': budget.name,
                'amount': budget.amount,
                'period': budget.period,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new BudgetEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.name ? data.name : "",
                    data.amount ? data.amount : 0,
                    data.period ? data.period : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
           
        });
    }
    update(budget: BudgetEntity): Promise<BudgetEntity> {
        return new Promise((resolve, reject) => {

            api.put(`/${this.collectionName}/${budget.id}`, {
                "name": budget.name,
                'amount': budget.amount,
                'period': budget.period,
            },{
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new BudgetEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.name ? data.name : "",
                    data.amount ? data.amount : 0,
                    data.period ? data.period : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => {
                reject(error);
            });

        });
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
    getById(id: string): Promise<BudgetEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/${this.collectionName}/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new BudgetEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.name ? data.name : "",
                    data.amount ? data.amount : 0,
                    data.period ? data.period : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<BudgetEntity[]> {
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
                const entities: BudgetEntity[] = [];

                data.forEach((item: any) => {

                    const entity = new BudgetEntity(
                        item.id ? item.id : "",
                        item.userId ? item.userId : "",
                        item.name ? item.name : "",
                        item.amount ? item.amount : 0,
                        item.period ? item.period : "",
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