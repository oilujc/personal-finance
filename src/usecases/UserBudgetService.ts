import UserBudgetEntity from "../domain/entities/UserBudgetEntity";
import IUserBudgetRepository from "../domain/repositories/IUserBudgetRepository";


export interface IUserBudgetService {

    create(userBudget: UserBudgetEntity): Promise<UserBudgetEntity>;

    update(userBudget: UserBudgetEntity): Promise<UserBudgetEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<UserBudgetEntity | null>;

    find(
        qs: any,
    ): Promise<UserBudgetEntity[]>;

    getCurrentBudgetsByUserId(userId: string): Promise<UserBudgetEntity>;

}

export default class UserBudgetService implements IUserBudgetService {

    private userBudgetRepository: IUserBudgetRepository;

    constructor(
        userBudgetRepository: IUserBudgetRepository,
    ) {
        this.userBudgetRepository = userBudgetRepository;
    }

    async create(userBudget: UserBudgetEntity): Promise<UserBudgetEntity> {

        return this.userBudgetRepository.create(userBudget);
    }

    update(userBudget: UserBudgetEntity): Promise<UserBudgetEntity> {
        return this.userBudgetRepository.update(userBudget);
    }

    delete(id: string): Promise<boolean> {
        return this.userBudgetRepository.delete(id);
    }

    getById(id: string): Promise<UserBudgetEntity | null> {
        return this.userBudgetRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<UserBudgetEntity[]> {
        return this.userBudgetRepository.find(qs);
    }

    async getCurrentBudgetsByUserId(userId: string): Promise<UserBudgetEntity> {

        const now = new Date();

        const data = await this.userBudgetRepository.find({
            userId: {
                constraint: 'eq',
                value: userId
            },
            currentMonth: {
                constraint: 'eq',
                value: now.getMonth()
            },
            currentYear: {
                constraint: 'eq',
                value: now.getFullYear()
            }
        });

        if (data.length > 0) {
            return data[0];
        }

        // Create new budgets for the user
        const userBudget = await this.userBudgetRepository.create(
            new UserBudgetEntity(
                '',
                userId,
                0,
                now.getMonth(),
                now.getFullYear(),
                0,
                0,
                0,
                0
            )
        );

        console.log('created new user budget', userBudget)

        return userBudget;

    }
    

}