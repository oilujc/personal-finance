export default class TransferEntity {
    id: string;

    fromAccountId: string;
    toAccountId: string;
    userId: string;

    amount: number;
    name?: string;

    amountReceived?: number;
    commission?: number;


    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        fromAccountId: string,
        toAccountId: string,
        userId: string,
        amount: number,
        name?: string,
        amountReceived?: number,
        commission?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.id = id;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.userId = userId;
        this.amount = amount;
        this.name = name;
        this.amountReceived = amountReceived;
        this.commission = commission;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject(object: any): TransferEntity {
        const entity = new TransferEntity(
            object.id ? object.id : "",
            object.fromAccountId ? object.fromAccountId : "",
            object.toAccountId ? object.toAccountId : "",
            object.userId ? object.userId : "",
            object.amount ? object.amount : 0,
            object.name ? object.name : "",
            object.amountReceived ? object.amountReceived : 0,
            object.commission ? object.commission : 0,
            object.createdAt ? new Date(object.createdAt) : new Date(),
            object.updatedAt ? new Date(object.updatedAt) : new Date(),
        );

        return entity;
    }
}

