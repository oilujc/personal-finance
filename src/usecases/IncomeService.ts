import IncomeEntity from "../domain/entities/IncomeEntity";
import IIncomeRepository from "../domain/repositories/IIncomeRepository";


export default class IncomeService {

    private incomeRepository: IIncomeRepository;
    constructor(
        incomeRepository: IIncomeRepository, 
    ) {
        this.incomeRepository = incomeRepository;
    }

    async create(income: IncomeEntity): Promise<IncomeEntity> {
        const incomeEntity = await this.incomeRepository.create(income);

        return incomeEntity;
    }

    update(income: IncomeEntity): Promise<IncomeEntity> {
        return this.incomeRepository.update(income);
    }

    async delete(id: string): Promise<boolean> {
        return this.incomeRepository.delete(id);
    }

    getById(id: string): Promise<IncomeEntity | null> {
        return this.incomeRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<IncomeEntity[]> {
        return this.incomeRepository.find(qs);
    }

}