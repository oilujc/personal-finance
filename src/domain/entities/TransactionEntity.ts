import ExpenseEntity from "./ExpenseEntity";
import IncomeEntity from "./IncomeEntity";
import TransferEntity from "./TransferEntity";

export default class TransactionEntity {

    type: string;
    item: IncomeEntity | ExpenseEntity | TransferEntity | null;

    constructor(
        type: string,
        item: IncomeEntity | ExpenseEntity | TransferEntity | null,
    ) {
        this.type = type;
        this.item = item;
    }
}