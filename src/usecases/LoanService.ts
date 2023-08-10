import PayLoanDTO from "../domain/dto/PayLoanDTO";
import LoanEntity from "../domain/entities/LoanEntity";
import ILoanRepository from "../domain/repositories/ILoanRepository";


export default class LoanService {

    private loanRepository: ILoanRepository;
    constructor(
        loanRepository: ILoanRepository,
    ) {
        this.loanRepository = loanRepository;
    }

    create(loan: LoanEntity): Promise<LoanEntity> {
        return this.loanRepository.create(loan);
    }

    update(loan: LoanEntity): Promise<LoanEntity> {
        return this.loanRepository.update(loan);
    }

    delete(id: string): Promise<boolean> {
        return this.loanRepository.delete(id);
    }

    getById(id: string): Promise<LoanEntity | null> {
        return this.loanRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<LoanEntity[]> {
        return this.loanRepository.find(qs);
    }

    pay(data: PayLoanDTO): Promise<LoanEntity> {
        return this.loanRepository.pay(data);
    }

}