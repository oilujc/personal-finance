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

                const data = response.data;
                const entity = UserTrackEntity.fromObject(data);

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


                const entity = UserTrackEntity.fromObject(data);
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

                    const entity = UserTrackEntity.fromObject(item);
                    entities.push(entity);

                });

                resolve(entities);


            }).catch((error) => { reject(error); });
        });
    }

}