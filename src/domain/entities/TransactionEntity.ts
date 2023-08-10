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

    static fromObject(object: any): TransactionEntity {

        let item = null;

        if (object.type === "expense") {
            item = ExpenseEntity.fromObject(object.item);
        }

        if (object.type === "income") {
            item = IncomeEntity.fromObject(object.item);
        }

        if (object.type === "transfer") {
            item = TransferEntity.fromObject(object.item);
        }

        const entity = new TransactionEntity(
            object.type ? object.type : "",
            item
        );

        return entity;
    }
}