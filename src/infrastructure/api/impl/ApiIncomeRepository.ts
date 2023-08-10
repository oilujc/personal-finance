import IncomeEntity from "../../../domain/entities/IncomeEntity";
import IIncomeRepository from "../../../domain/repositories/IIncomeRepository";
import api from "../api";

export default class ApiIncomeRepository implements IIncomeRepository {


    create(account: IncomeEntity): Promise<IncomeEntity> {
        return new Promise((resolve, reject) => {

            api.post("/incomes", {
                'accountId': account.accountId,
                'name': account.name,
                'note': account.note,
                'amount': account.amount,
                'date': account.date,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = IncomeEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }

    update(account: IncomeEntity): Promise<IncomeEntity> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            api.delete(`/incomes/${id}`, {
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

    getById(id: string): Promise<IncomeEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/incomes/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = IncomeEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<IncomeEntity[]> {
        return new Promise((resolve, reject) => {

            api.get("/incomes", {
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
                const entities: IncomeEntity[] = [];

                data.forEach((item: any) => {

                    const entity = IncomeEntity.fromObject(item);
                    entities.push(entity);

                });

                resolve(entities);


            }).catch((error) => { reject(error); });

        });
    }

}