import TransferEntity from "../../../domain/entities/TransferEntity";
import ITransferRepository from "../../../domain/repositories/ITransferRepository";
import api from "../api";

export default class ApiTransferRepository implements ITransferRepository {

    private collectionName = "transfer";


    create(transfer: TransferEntity): Promise<TransferEntity> {
        return new Promise((resolve, reject) => {

            api.post(`/${this.collectionName}`, {
                'fromAccountId': transfer.fromAccountId,
                'toAccountId': transfer.toAccountId,
                'amount': transfer.amount,
                'amountReceived': transfer.amountReceived,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                const data = response.data;

                const entity = new TransferEntity(
                    data.id ? data.id : "",
                    data.userId ? data.userId : "",
                    data.fromAccountId ? data.fromAccountId : "",
                    data.toAccountId ? data.toAccountId : "",
                    data.amount ? data.amount : 0,
                    data.name ? data.name : "",
                    data.amountReceived ? data.amountReceived : null,
                    data.createdAt ? data.createdAt : new Date(),
                    data.updatedAt ? data.updatedAt : new Date(),
                );

                resolve(entity);

            }).catch((error) => { reject(error); });
        });
    }
    update(transfer: TransferEntity): Promise<TransferEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<TransferEntity | null> {
        throw new Error("Method not implemented.");
    }
    find(qs: any): Promise<TransferEntity[]> {
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
                const entities: TransferEntity[] = [];

                data.forEach((item: any) => {

                    const entity = new TransferEntity(
                        item.id ? item.id : "",
                        item.userId ? item.userId : "",
                        item.fromAccountId ? item.fromAccountId : "",
                        item.toAccountId ? item.toAccountId : "",
                        item.amount ? item.amount : 0,
                        item.name ? item.name : "",
                        item.amountReceived ? item.amountReceived : null,
                        item.commission ? item.commission : null,
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