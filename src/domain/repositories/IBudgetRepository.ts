import BudgetEntity from "../entities/BudgetEntity";

export default interface IBudgetRepository {
    
    create(budget: BudgetEntity): Promise<BudgetEntity>;

    update(budget: BudgetEntity): Promise<BudgetEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<BudgetEntity | null>;

    find(
        qs: any,
    ): Promise<BudgetEntity[]>;

}