import BudgetProgressEntity from "../domain/entities/BudgetProgressEntity";
import ExpenseEntity from "../domain/entities/ExpenseEntity";
import IBudgetProgressRepository from "../domain/repositories/IBudgetProgressRepository";
import IBudgetRepository from "../domain/repositories/IBudgetRepository";
import { IUserBudgetService } from "./UserBudgetService";

interface UpdateOrCreateBudgetProgressDTO {
    budgetId: string;
    expense: ExpenseEntity;
    expenseAction: "create" | "delete";
}

export interface IBudgetProgressService {
    create(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity>;

    update(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<BudgetProgressEntity | null>;

    find(
        qs: any,
    ): Promise<BudgetProgressEntity[]>;
}

export default class BudgetProgressService implements IBudgetProgressService {


    private budgetProgressRepository: IBudgetProgressRepository;

    constructor(
        budgetProgressRepository: IBudgetProgressRepository,
    ) {
        this.budgetProgressRepository = budgetProgressRepository;
    }

    async create(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity> {
        return this.budgetProgressRepository.create(budgetProgress);
    }

    async update(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity> {
        return this.budgetProgressRepository.update(budgetProgress);
    }

    async delete(id: string): Promise<boolean> {
        return this.budgetProgressRepository.delete(id);
    }

    async getById(id: string): Promise<BudgetProgressEntity | null> {
        return this.budgetProgressRepository.getById(id);
    }

    async find(
        qs: any,
    ): Promise<BudgetProgressEntity[]> {
        return this.budgetProgressRepository.find(qs);
    }

}