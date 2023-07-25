import AccountEntity from "../domain/entities/AccountEntity";
import IAccountRepository from "../domain/repositories/IAccountRepository";
import { IUserBudgetService } from "./UserBudgetService";

export interface IAccountService {

    create(account: AccountEntity): Promise<AccountEntity>;

    update(account: AccountEntity): Promise<AccountEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<AccountEntity | null>;

    find(
        qs: any,
    ): Promise<AccountEntity[]>;
    
}

export default class AccountService {
    private accountRepository: IAccountRepository;

    constructor(
        accountRepository: IAccountRepository,
    ) {
        this.accountRepository = accountRepository;
    }

    public async create(account: AccountEntity): Promise<AccountEntity> {
        return this.accountRepository.create(account);
    }

    public async update(account: AccountEntity): Promise<AccountEntity> {
        return this.accountRepository.update(account);
    }

    public async delete(id: string): Promise<boolean> {
        return this.accountRepository.delete(id);
    }

    public async getById(id: string): Promise<AccountEntity | null> {
        return this.accountRepository.getById(id);
    }

    public async find(qs: any): Promise<AccountEntity[]> {
        return this.accountRepository.find(qs);
    }
    
}