import BudgetEntity from "../domain/entities/BudgetEntity";
import IBudgetRepository from "../domain/repositories/IBudgetRepository";

export default class BudgetService {

    private budgetRepository: IBudgetRepository;

    constructor(budgetRepository: IBudgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    create(budget: BudgetEntity): Promise<BudgetEntity> {
        return this.budgetRepository.create(budget);
    }

    update(budget: BudgetEntity): Promise<BudgetEntity> {
        return this.budgetRepository.update(budget);
    }

    delete(id: string): Promise<boolean> {
        return this.budgetRepository.delete(id);
    }

    getById(id: string): Promise<BudgetEntity | null> {
        return this.budgetRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<BudgetEntity[]> {
        return this.budgetRepository.find(qs);
    }

    

}