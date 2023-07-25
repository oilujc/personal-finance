export default class IncomeEntity {

    id: string;
    userId: string;
    accountId: string;

    name: string;
    note: string;

    amount: number;

    date?: string;

    createdAt?: Date;
    updatedAt?: Date;
    
    constructor(
        id: string,
        userId: string,
        accountId: string,
        name: string,
        note: string,
        amount: number,
        date?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.accountId = accountId;
        this.name = name;
        this.note = note;
        this.amount = amount;
        this.date = date;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


}