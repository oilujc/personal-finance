import ExpenseEntity from "../domain/entities/ExpenseEntity";
import IExpenseRepository from "../domain/repositories/IExpenseRepository";

export default class ExpenseService {

    private expenseRepository: IExpenseRepository;
    constructor(
        expenseRepository: IExpenseRepository,
    ) {
        this.expenseRepository = expenseRepository;
    }

    create(expense: ExpenseEntity): Promise<ExpenseEntity> {
        return this.expenseRepository.create(expense);
    }

    update(income: ExpenseEntity): Promise<ExpenseEntity> {
        return this.expenseRepository.update(income);
    }

    delete(id: string): Promise<boolean> {
        return this.expenseRepository.delete(id);
    }

    getById(id: string): Promise<ExpenseEntity | null> {
        return this.expenseRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<ExpenseEntity[]> {
        return this.expenseRepository.find(qs);
    }

}