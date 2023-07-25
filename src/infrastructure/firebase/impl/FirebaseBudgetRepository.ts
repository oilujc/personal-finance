import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import BudgetEntity from "../../../domain/entities/BudgetEntity";
import IBudgetRepository from "../../../domain/repositories/IBudgetRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseBudgetRepository implements IBudgetRepository {

    private collectionName = "budgets";

    create(budget: BudgetEntity): Promise<BudgetEntity> {
        return new Promise((resolve, reject) => {

            resolve(budget);
        });
    }
    update(budget: BudgetEntity): Promise<BudgetEntity> {
        return new Promise((resolve, reject) => {

           resolve(budget);

        });
    }
    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            resolve(true);
        });
    }
    getById(id: string): Promise<BudgetEntity | null> {
        return new Promise((resolve, reject) => {

          resolve(new BudgetEntity(
            "id",
            "userId",
            "name",
            0,
            "period",
            new Date(),
            new Date(),
          ));

        });
    }
    find(qs: any): Promise<BudgetEntity[]> {
        return new Promise((resolve, reject) => {
            resolve([
                new BudgetEntity(
                    "id",
                    "userId",
                    "name",
                    0,
                    "period",
                    new Date(),
                    new Date(),
                )
            ]);
        });
    }

}