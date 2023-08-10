import PayLoanDTO from "../dto/PayLoanDTO";
import LoanEntity from "../entities/LoanEntity";



export default interface ILoanRepository {
    
    create(loan: LoanEntity): Promise<LoanEntity>;

    update(loan: LoanEntity): Promise<LoanEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<LoanEntity | null>;

    find(
        qs: any,
    ): Promise<LoanEntity[]>;

    pay(data: PayLoanDTO): Promise<LoanEntity>;

}