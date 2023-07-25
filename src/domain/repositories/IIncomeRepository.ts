import IncomeEntity from "../entities/IncomeEntity";

export default interface IIncomeRepository {
    
    create(income: IncomeEntity): Promise<IncomeEntity>;

    update(income: IncomeEntity): Promise<IncomeEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<IncomeEntity | null>;

    find(
        qs: any,
    ): Promise<IncomeEntity[]>;

}