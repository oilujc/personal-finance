import UserTrackEntity from "../../../domain/entities/UserTrackEntity";
import ExpenseEntity from "../../../domain/entities/ExpenseEntity";
import IUserTrackRepository from "../../../domain/repositories/IUserTrackRepository";
import api from "../api";

export default class ApiUserTrackRepository implements IUserTrackRepository {

    private collectionName = "user-track";


    create(UserTrack: UserTrackEntity): Promise<UserTrackEntity> {
        throw new Error("Method not implemented.");
    }
    update(UserTrack: UserTrackEntity): Promise<UserTrackEntity> {
        return new Promise((resolve, reject) => {
            api.put(`/${this.collectionName}`, {
                budgetMonthMax: UserTrack.budgetMonthMax,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const entity = new UserTrackEntity(
                    response.data.id ? response.data.id : "",
                    response.data.userId ? response.data.userId : "",
                    response.data.budgetMonthMax ? response.data.budgetMonthMax : 0,
                    response.data.currentMonth ? response.data.currentMonth : 0,
                    response.data.currentYear ? response.data.currentYear : 0,
                    response.data.currentAmount ? response.data.currentAmount : 0,
                    response.data.currentProgress ? response.data.currentProgress : 0,
                    response.data.totalIncome ? response.data.totalIncome : 0,
                    response.data.totalExpense ? response.data.totalExpense : 0,
                    response.data.createdAt ? response.data.createdAt : new Date(),
                    response.data.updatedAt ? response.data.updatedAt : new Date(),
                );

                resolve(entity);
            }).catch((error) => { reject(error); });
        
        });
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<UserTrackEntity> {
        throw new Error("Method not implemented.");
    }
    getOne(qs: any): Promise<UserTrackEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/${this.collectionName}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                const data = response.data;

                if (data === null) {
                    resolve(null);
                    return;
                }

                const entity = new UserTrackEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.budgetMonthMax ? data.budgetMonthMax : 0,
                    data.currentMonth ? data.currentMonth : 0,
                    data.currentYear ? data.currentYear : 0,
                    data.currentAmount ? data.currentAmount : 0,
                    data.currentProgress ? data.currentProgress : 0,
                    data.totalIncome ? data.totalIncome : 0,
                    data.totalExpense ? data.totalExpense : 0,
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);
                
            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<UserTrackEntity[]> {
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
                const entities: UserTrackEntity[] = [];

                data.forEach((item: any) => {

                    const entity = new UserTrackEntity(
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