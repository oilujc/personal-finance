export default class UserBudgetEntity {

    id: string;

    userId: string;
    budgetMonthMax: number;
    currentMonth: number;
    currentYear: number;
    currentAmount: number;
    currentProgress: number;

    totalIncome: number;
    totalExpense: number;

    createdAt?: Date;
    updatedAt?: Date;

    constructor(id: string,
        userId: string,
        budgetMonthMax: number,
        currentMonth: number,
        currentYear: number,
        currentAmount: number,
        currentProgress: number,
        totalIncome: number,
        totalExpense: number,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.budgetMonthMax = budgetMonthMax;
        this.currentMonth = currentMonth;
        this.currentYear = currentYear;
        this.currentAmount = currentAmount;
        this.currentProgress = currentProgress;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }



}