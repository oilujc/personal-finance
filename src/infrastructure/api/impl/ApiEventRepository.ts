import EventEntity from "../../../domain/entities/EventEntity";
import IEventRepository from "../../../domain/repositories/IEventRepository";
import api from "../api";

export default class ApiEventRepository implements IEventRepository {
    private collectionName = "events";

    // userId: string,
    // name: string,
    // estimatedAmount: number,
    // date: string,
    // eventType: string,
    // sendReminder: boolean,

    create(event: EventEntity): Promise<EventEntity> {
        return new Promise((resolve, reject) => {
            api.post(`/${this.collectionName}`, {
                "name": event.name,
                'estimatedAmount': event.estimatedAmount,
                'eventType': event.eventType,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new EventEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.name ? data.name : "",
                    data.estimatedAmount ? data.estimatedAmount : 0,
                    data.eventType ? data.eventType : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    update(event: EventEntity): Promise<EventEntity> {
        return new Promise((resolve, reject) => {
            api.put(`/${this.collectionName}/${event.id}`, {
                "name": event.name,
                'estimatedAmount': event.estimatedAmount,
                'eventType': event.eventType,
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new EventEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.name ? data.name : "",
                    data.estimatedAmount ? data.estimatedAmount : 0,
                    data.eventType ? data.eventType : "",
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
    getById(id: string): Promise<EventEntity | null> {
        return new Promise((resolve, reject) => {
            api.get(`/${this.collectionName}/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new EventEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.name ? data.name : "",
                    data.estimatedAmount ? data.estimatedAmount : 0,
                    data.eventType ? data.eventType : "",
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    find(qs: any): Promise<EventEntity[]> {
        return new Promise((resolve, reject) => {

            api.get("/${this.collectionName}", {
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
                const items: EventEntity[] = [];

                data.forEach((item: any) => {

                    const entity = new EventEntity(
                        item.id ? item.id : "",
                        item.userId ? item.userId : "",
                        item.name ? item.name : "",
                        item.estimatedAmount ? item.estimatedAmount : 0,
                        item.eventType ? item.eventType : "",
                        item.createdAt ? item.createdAt : new Date(),
                        item.updatedAt ? item.updatedAt : new Date(),
                    );

                    items.push(entity);

                });

                resolve(items);


            }).catch((error) => { reject(error); });

        });
    }

}