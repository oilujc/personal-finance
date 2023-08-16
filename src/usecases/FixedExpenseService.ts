import FixedExpenseEntity from "../domain/entities/FixedExpenseEntity";
import IFixedExpenseRepository from "../domain/repositories/IFixedExpenseRepository";


export default class FixedExpenseService {

    private fixedExpenseRepository: IFixedExpenseRepository;
    constructor(
        fixedExpenseRepository: IFixedExpenseRepository,
    ) {
        this.fixedExpenseRepository = fixedExpenseRepository;
    }

    create(fixedExpense: FixedExpenseEntity): Promise<FixedExpenseEntity> {
        return this.fixedExpenseRepository.create(fixedExpense);
    }

    update(fixedExpense: FixedExpenseEntity): Promise<FixedExpenseEntity> {
        return this.fixedExpenseRepository.update(fixedExpense);
    }

    delete(id: string): Promise<boolean> {
        return this.fixedExpenseRepository.delete(id);
    }

    getById(id: string): Promise<FixedExpenseEntity | null> {
        return this.fixedExpenseRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<FixedExpenseEntity[]> {
        return this.fixedExpenseRepository.find(qs);
    }
}