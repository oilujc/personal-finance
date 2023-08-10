import ExpenseEntity from "./ExpenseEntity";
import IncomeEntity from "./IncomeEntity";


export default class LoanEntity {

    static readonly STATUS_CODE: { 
        [key: string]: string;
    } = {
        "pending": "Pendiente",
        "paid": "Pagado",
        "canceled": "Cancelado",
    };

    static readonly LOAN_TYPES: { 
        [key: string]: string;
    } = {
        "income": "Ingreso",
        "expense": "Egreso",
    };

    id: string;
    userId: string;
    accountId: string;
    budgetId?: string;

    amount: number;
    currentAmount?: number;

    fromUser: string;
    toUser: string;

    name?: string;
    note?: string;
    paidAt?: string;

    paidDateMax?: string;
    paidDateMin?: string;

    incomes?: IncomeEntity[];
    expenses?: ExpenseEntity[];

    status?: string;
    loanType?: string;

    createdAt?: Date;
    updatedAt?: Date;
    
    constructor(
        id: string,
        userId: string,
        accountId: string,
        amount: number,
        fromUser: string,
        toUser: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.accountId = accountId;
        this.amount = amount;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject(object: any): LoanEntity {
        const entity = new LoanEntity(
            object.id ? object.id : "",
            object.userId ? object.userId : "",
            object.accountId ? object.accountId : "",
            object.amount ? object.amount : 0,
            object.fromUser ? object.fromUser : "",
            object.toUser ? object.toUser : "",
            object.createdAt ? new Date(object.createdAt) : new Date(),
            object.updatedAt ? new Date(object.updatedAt) : new Date(),
        );

        entity.budgetId = object.budgetId ? object.budgetId : "";
        entity.currentAmount = object.currentAmount ? object.currentAmount : 0;
        entity.name = object.name ? object.name : "";
        entity.note = object.note ? object.note : "";
        entity.paidAt = object.paidAt ? object.paidAt : "";
        entity.paidDateMax = object.paidDateMax ? object.paidDateMax : "";
        entity.paidDateMin = object.paidDateMin ? object.paidDateMin : "";
        entity.status = object.status ? object.status : "";
        entity.loanType = object.loanType ? object.loanType : "";

        entity.incomes = object.incomes ? object.incomes.map((item: any) => IncomeEntity.fromObject(item)) : [];
        entity.expenses = object.expenses ? object.expenses.map((item: any) => ExpenseEntity.fromObject(item)) : [];

        return entity;   
    }
}