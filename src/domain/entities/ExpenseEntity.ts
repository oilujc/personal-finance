export default class ExpenseEntity {

    id: string;
    userId: string;
    accountId: string;
    budgetId: string; // BudgetEntity.id
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
        budgetId: string,
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
        this.budgetId = budgetId;
        this.name = name;
        this.note = note;
        this.amount = amount;
        this.date = date;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    static fromObject(object: any): ExpenseEntity {
        const entity = new ExpenseEntity(
            object.id ? object.id : "",
            object.userId ? object.userId : "",
            object.accountId ? object.accountId : "",
            object.budgetId ? object.budgetId : "",
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