import FixedExpenseEntity from "../../../domain/entities/FixedExpenseEntity";
import IFixedExpenseRepository from "../../../domain/repositories/IFixedExpenseRepository";
import api from "../api";

export default class ApiFixedExpenseRepository implements IFixedExpenseRepository {
    private collectionName = "fixed-expenses";

    create(fixedExpense: FixedExpenseEntity): Promise<FixedExpenseEntity> {
        return new Promise((resolve, reject) => {
            api.post(`/${this.collectionName}`, {
                'name': fixedExpense.name,
                'amount': fixedExpense.amount,
                'date': fixedExpense.date,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = FixedExpenseEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    update(fixedExpense: FixedExpenseEntity): Promise<FixedExpenseEntity> {
        return new Promise((resolve, reject) => {
            api.put(`/${this.collectionName}/${fixedExpense.id}`, {
                'name': fixedExpense.name,
                'amount': fixedExpense.amount,
                'date': fixedExpense.date,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = FixedExpenseEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
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
    getById(id: string): Promise<FixedExpenseEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/${this.collectionName}/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = FixedExpenseEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<FixedExpenseEntity[]> {
        return new Promise((resolve, reject) => {

            api.get(`/${this.collectionName}`, {
                params: {
                    limit: qs.limit ? qs.limit : 10,
                    offset: qs.offset ? qs.offset : 0,
                    orderBy: qs.orderBy ? qs.orderBy : "createdAt",
                    order: qs.order ? qs.order : "desc",
                },
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const items: FixedExpenseEntity[] = [];

                data.forEach((item: any) => {

                    const entity = FixedExpenseEntity.fromObject(item);
                    items.push(entity);

                });

                resolve(items);


            }).catch((error) => { reject(error); });

        });
    }
}