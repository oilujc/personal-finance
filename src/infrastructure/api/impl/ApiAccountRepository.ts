import AccountEntity from "../../../domain/entities/AccountEntity";
import IAccountRepository from "../../../domain/repositories/IAccountRepository";
import api from "../api";

export default class ApiAccountRepository implements IAccountRepository {


    create(account: AccountEntity): Promise<AccountEntity> {
        return new Promise((resolve, reject) => {
            api.post("/accounts", {
                "initialAmount": account.initialAmount,
                "name": account.name,
                "isActive": account.isActive,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const accountEntity = new AccountEntity(
                    data.id ? data.id : "",
                    data.initialAmount ? data.initialAmount : 0,
                    data.currentAmount ? data.currentAmount : 0,
                    data.totalExpenses ? data.totalExpenses : 0,    
                    data.totalIncomes ? data.totalIncomes : 0,
                    data.totalTransfersIn ? data.totalTransfersIn : 0,
                    data.totalTransfersOut ? data.totalTransfersOut : 0,
                    data.userId ? data.userId : "",
                    data.isActive ? data.isActive : false,
                    data.name ? data.name : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(accountEntity);

            }).catch((error) => { reject(error); });
        });
    }
    update(account: AccountEntity): Promise<AccountEntity> {
        return new Promise((resolve, reject) => {
            api.put(`/accounts/${account.id}`, {
                "name": account.name,
                "isActive": account.isActive,
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const accountEntity = new AccountEntity(
                    data.id ? data.id : "",
                    data.initialAmount ? data.initialAmount : 0,
                    data.currentAmount ? data.currentAmount : 0,
                    data.totalExpenses ? data.totalExpenses : 0,    
                    data.totalIncomes ? data.totalIncomes : 0,
                    data.totalTransfersIn ? data.totalTransfersIn : 0,
                    data.totalTransfersOut ? data.totalTransfersOut : 0,
                    data.userId ? data.userId : "",
                    data.isActive ? data.isActive : false,
                    data.name ? data.name : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(accountEntity);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            api.delete(`/accounts/${id}`, {
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
    getById(id: string): Promise<AccountEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/accounts/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const accountEntity = new AccountEntity(
                    data.id ? data.id : "",
                    data.initialAmount ? data.initialAmount : 0,
                    data.currentAmount ? data.currentAmount : 0,
                    data.totalExpenses ? data.totalExpenses : 0,    
                    data.totalIncomes ? data.totalIncomes : 0,
                    data.totalTransfersIn ? data.totalTransfersIn : 0,
                    data.totalTransfersOut ? data.totalTransfersOut : 0,
                    data.userId ? data.userId : "",
                    data.isActive ? data.isActive : false,
                    data.name ? data.name : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(accountEntity);

            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<AccountEntity[]> {
        return new Promise((resolve, reject) => {

            api.get("/accounts", {
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
                const accounts: AccountEntity[] = [];

                data.forEach((item: any) => {

                    const accountEntity = new AccountEntity(
                        item.id ? item.id : "",
                        item.initialAmount ? item.initialAmount : 0,
                        item.currentAmount ? item.currentAmount : 0,
                        item.totalExpenses ? item.totalExpenses : 0,    
                        item.totalIncomes ? item.totalIncomes : 0,
                        item.totalTransfersIn ? item.totalTransfersIn : 0,
                        item.totalTransfersOut ? item.totalTransfersOut : 0,
                        item.userId ? item.userId : "",
                        item.isActive ? item.isActive : false,
                        item.name ? item.name : "",
                        item.createdAt ? item.createdAt : new Date(),
                        item.updatedAt ? item.updatedAt : new Date(),
                    );

                    accounts.push(accountEntity);

                });

                resolve(accounts);


            }).catch((error) => { reject(error); });

        });
    }

}