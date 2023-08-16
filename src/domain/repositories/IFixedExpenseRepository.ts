import FixedExpenseEntity from "../entities/FixedExpenseEntity";

export default interface IFixedExpenseRepository {
    create(fixedExpense: FixedExpenseEntity): Promise<FixedExpenseEntity>;

    update(fixedExpense: FixedExpenseEntity): Promise<FixedExpenseEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<FixedExpenseEntity | null>;

    find(
        qs: any,
    ): Promise<FixedExpenseEntity[]>;

}
