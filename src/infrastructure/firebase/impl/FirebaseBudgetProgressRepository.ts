import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import BudgetProgressEntity from "../../../domain/entities/BudgetProgressEntity";
import IBudgetProgressRepository from "../../../domain/repositories/IBudgetProgressRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseBudgetProgressRepository implements IBudgetProgressRepository {

    private collectionName = "budgetProgress";


    create(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity> {
        throw new Error("Method not implemented.");
    }
    update(budgetProgress: BudgetProgressEntity): Promise<BudgetProgressEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<BudgetProgressEntity> {
        throw new Error("Method not implemented.");
    }
    find(qs: any): Promise<BudgetProgressEntity[]> {
        throw new Error("Method not implemented.");
    }

}