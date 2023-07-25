import AccountEntity from "../entities/AccountEntity";

export default interface IAccountRepository {
    
    create(account: AccountEntity): Promise<AccountEntity>;

    update(account: AccountEntity): Promise<AccountEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<AccountEntity | null>;

    find(
        qs: any,
    ): Promise<AccountEntity[]>;

}