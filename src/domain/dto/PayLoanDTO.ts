
export default interface PayLoanDTO {
    loanId: string;
    accountId: string;
    amount: number;
    budgetId?: string | null;
}
