import ExpenseEntity from "./ExpenseEntity";

export default class BudgetProgressEntity {
    id: string;

    userId: string;
    budgetId: string;

    month: number;
    year: number;

    currentAmount: number;
    currentProgress: number;
    
    expenses: ExpenseEntity[];
    
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        userId: string,
        budgetId: string,
        currentAmount: number,
        currentProgress: number,
        month: number,
        year: number,
        expenses: ExpenseEntity[],
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.budgetId = budgetId;
        this.month = month;
        this.year = year;
        this.currentAmount = currentAmount;
        this.currentProgress = currentProgress;
        this.expenses = expenses;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject(object: any): BudgetProgressEntity {
        return new BudgetProgressEntity(
            object.id,
            object.userId,
            object.budgetId,
            object.currentAmount,
            object.currentProgress,
            object.month,
            object.year,
            object.expenses.map((expense: any) => ExpenseEntity.fromObject(expense)),
            object.createdAt,
            object.updatedAt
        );
    }

}