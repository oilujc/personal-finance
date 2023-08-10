import PayLoanDTO from "../../../domain/dto/PayLoanDTO";
import LoanEntity from "../../../domain/entities/LoanEntity";
import ILoanRepository from "../../../domain/repositories/ILoanRepository";
import api from "../api";

export default class ApiLoanRepository implements ILoanRepository {
    private collectionName = "loan";

    create(loan: LoanEntity): Promise<LoanEntity> {
        return new Promise((resolve, reject) => {
            api.post(`/${this.collectionName}`, {
                "accountId" : loan.accountId,
                "amount": loan.amount,
                "fromUser": loan.fromUser,
                "toUser": loan.toUser,
                "budgetId": loan.budgetId,
                "note" : loan.note,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = LoanEntity.fromObject(data);
                
                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    update(loan: LoanEntity): Promise<LoanEntity> {
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
    getById(id: string): Promise<LoanEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/${this.collectionName}/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = LoanEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<LoanEntity[]> {
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
                const items: LoanEntity[] = [];

                data.forEach((item: any) => {

                    const entity = LoanEntity.fromObject(item);
                    items.push(entity);

                });

                resolve(items);


            }).catch((error) => { reject(error); });

        });
    }

    pay(data: PayLoanDTO): Promise<LoanEntity> {
        return new Promise((resolve, reject) => {
            api.post(`/${this.collectionName}/${data.loanId}/pay`, {
                "accountId" : data.accountId,
                "amount": data.amount,
                "budgetId": data.budgetId,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;
                const entity = LoanEntity.fromObject(data);

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }

}