import UserBudgetEntity from "../entities/UserBudgetEntity";

export default interface IUserBudgetRepository {
    
    create(userBudget: UserBudgetEntity): Promise<UserBudgetEntity>;

    update(userBudget: UserBudgetEntity): Promise<UserBudgetEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<UserBudgetEntity | null>;

    find(
        qs: any,
    ): Promise<UserBudgetEntity[]>;

}