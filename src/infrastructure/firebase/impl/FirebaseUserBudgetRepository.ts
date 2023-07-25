import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import UserBudgetEntity from "../../../domain/entities/UserBudgetEntity";
import { db } from "../firebase";
import getContraints from "../getConstraints";
import IUserBudgetRepository from "../../../domain/repositories/IUserBudgetRepository";

export default class FirebaseUserBudgetRepository implements IUserBudgetRepository {

    private collectionName = "userBudgets";

    create(userBudget: UserBudgetEntity): Promise<UserBudgetEntity> {
        return new Promise((resolve, reject) => {

            const budgetCollection = collection(db, this.collectionName);

            addDoc(budgetCollection, {
                userId: userBudget.userId,
                budgetMonthMax: userBudget.budgetMonthMax,
                currentMonth: userBudget.currentMonth,
                currentYear: userBudget.currentYear,
                currentAmount: userBudget.currentAmount,
                currentProgress: userBudget.currentProgress,
                totalIncome: userBudget.totalIncome,
                totalExpense: userBudget.totalExpense,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).then((docRef) => {

                const id = docRef.id;

                userBudget.id = id;
                resolve(userBudget);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    update(userBudget: UserBudgetEntity): Promise<UserBudgetEntity> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, userBudget.id);


            updateDoc(docRef, {
                userId: userBudget.userId,
                budgetMonthMax: userBudget.budgetMonthMax,
                currentMonth: userBudget.currentMonth,
                currentYear: userBudget.currentYear,
                currentAmount: userBudget.currentAmount,
                currentProgress: userBudget.currentProgress,
                totalIncome: userBudget.totalIncome,
                totalExpense: userBudget.totalExpense,
                createdAt: userBudget.createdAt,
                updatedAt: new Date(),
            }).then(() => {
                resolve(userBudget);
            }).catch((error) => {
                reject(error);
            });

        });
    }
    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            deleteDoc(docRef).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    getById(id: string): Promise<UserBudgetEntity | null> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {

                if (doc.exists()) {

                    const userBudget = doc.data();

                    const userBudgetEntity = new UserBudgetEntity(
                        doc.id,
                        userBudget.userId,
                        userBudget.budgetMonthMax,
                        userBudget.currentMonth,
                        userBudget.currentYear,
                        userBudget.currentAmount,
                        userBudget.currentProgress,
                        userBudget.totalIncome,
                        userBudget.totalExpense,
                        userBudget.createdAt,
                        userBudget.updatedAt,
                    );

                    resolve(userBudgetEntity);

                } else {
                    resolve(null);
                }

            }
            ).catch((error) => {
                reject(error);
            });
        });
    }
    find(qs: any): Promise<UserBudgetEntity[]> {
        return new Promise((resolve, reject) => {

            const budgetCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(budgetCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const userBudgets: UserBudgetEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const budget = doc.data();

                    const userBudgetEntity = new UserBudgetEntity(
                        doc.id,
                        budget.userId,
                        budget.budgetMonthMax,
                        budget.currentMonth,
                        budget.currentYear,
                        budget.currentAmount,
                        budget.currentProgress,
                        budget.totalIncome,
                        budget.totalExpense,
                        budget.createdAt,
                        budget.updatedAt,
                    );

                    userBudgets.push(userBudgetEntity);

                });

                resolve(userBudgets);

            }).catch((error) => {
                reject(error);
            });

        });
    }

}