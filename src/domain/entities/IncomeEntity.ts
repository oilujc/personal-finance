export default class IncomeEntity {

    id: string;
    userId: string;
    accountId: string;
    loanId?: string;

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

    static fromObject(object: any): IncomeEntity {
        const entity = new IncomeEntity(
            object.id ? object.id : "",
            object.userId ? object.userId : "",
            object.accountId ? object.accountId : "",
            object.name ? object.name : "",
            object.note ? object.note : "",
            object.amount ? object.amount : 0,
            object.date ? object.date : null,
            object.createdAt ? new Date(object.createdAt) : new Date(),
            object.updatedAt ? new Date(object.updatedAt) : new Date(),
        );

        entity.loanId = object.loanId ? object.loanId : "";

        return entity;
    }
}