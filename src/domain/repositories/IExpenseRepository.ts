import ExpenseEntity from "../entities/ExpenseEntity";

export default interface IExpenseRepository {
    create(expense: ExpenseEntity): Promise<ExpenseEntity>;

    update(expense: ExpenseEntity): Promise<ExpenseEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<ExpenseEntity | null>;

    find(
        qs: any,
    ): Promise<ExpenseEntity[]>;

}
