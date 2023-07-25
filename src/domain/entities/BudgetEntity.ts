import BudgetProgressEntity from "./BudgetProgressEntity";

export default class BudgetEntity {
    id: string;
    userId: string;

    name: string;
    amount: number;
    period: string; // monthly, weekly, daily, yearly

    createdAt?: Date;
    updatedAt?: Date;

    private budgetProgress?: BudgetProgressEntity;

    constructor(
        id: string,
        userId: string,
        name: string,
        amount: number,
        period: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.amount = amount;
        this.period = period;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public get getBudgetProgress(): BudgetProgressEntity | undefined {
        return this.budgetProgress;
    }

    public set setBudgetProgress(budgetProgress: BudgetProgressEntity | undefined) {
        this.budgetProgress = budgetProgress;
    }

}
