export default class TransferEntity {
    id: string;

    fromAccountId: string;
    toAccountId: string;
    userId: string;

    amount: number;
    name?: string;


    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        fromAccountId: string,
        toAccountId: string,
        userId: string,
        amount: number,
        name?: string,
        createdAt?: Date,
        updatedAt?: Date) {
        this.id = id;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.userId = userId;
        this.amount = amount;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

