import ExpenseEntity from "./ExpenseEntity";

export default class FixedExpenseEntity {

    // public $id;
    // public $userId;

    // public $name;
    // public $amount;
    // public $date;

    // public $createdAt;
    // public $updatedAt;

    id: string;
    userId: string;
    name: string;
    amount: number;
    date: number;

    expenses?: ExpenseEntity[];

    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        userId: string,
        name: string,
        amount: number,
        date: number,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    static fromObject(object: any): FixedExpenseEntity {
        const entity = new FixedExpenseEntity(
            object.id ? object.id : "",
            object.userId ? object.userId : "",
            object.name ? object.name : "",
            object.amount ? object.amount : 0,
            object.date ? object.date : "",
            object.createdAt ? new Date(object.createdAt) : new Date(),
            object.updatedAt ? new Date(object.updatedAt) : new Date(),
        );

        entity.expenses = object.expenses ? object.expenses.map((expense: any) => ExpenseEntity.fromObject(expense)) : [];

        return entity;
    }
}