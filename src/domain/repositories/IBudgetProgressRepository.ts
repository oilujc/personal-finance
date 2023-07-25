import BudgetProgressEntity from "../entities/BudgetProgressEntity";

export default interface IBudgetProgressRepository {
        
        create(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity>;
    
        update(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity>;
    
        delete(id: string): Promise<boolean>;
    
        getById(id: string): Promise<BudgetProgressEntity>;
    
        find(
            qs: any,
        ): Promise<BudgetProgressEntity[]>;
}