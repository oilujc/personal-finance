import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import getContraints from "../getConstraints";
import IExpenseRepository from "../../../domain/repositories/IExpenseRepository";
import ExpenseEntity from "../../../domain/entities/ExpenseEntity";

export default class FirebaseExpenseRepository implements IExpenseRepository {

    private collectionName = "expenses";

    create(expense: ExpenseEntity): Promise<ExpenseEntity> {
        return new Promise((resolve, reject) => {

            const expensesCollection = collection(db, this.collectionName);

            addDoc(expensesCollection, {
                name: expense.name,
                note: expense.note,
                amount: expense.amount,
                userId: expense.userId,
                accountId: expense.accountId,
                budgetId: expense.budgetId,
                date: expense.date,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then((docRef) => {

                const id = docRef.id;

                expense.id = id;
                resolve(expense);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    update(income: ExpenseEntity): Promise<ExpenseEntity> {
        throw new Error("Method not implemented.");
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
    getById(id: string): Promise<ExpenseEntity | null> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {
                    
                    if (doc.exists()) {
    
                        const expense = doc.data();
    
                        const expenseentity = new ExpenseEntity(
                            doc.id,
                            expense.userId,
                            expense.accountId,
                            expense.categoryId,
                            expense.name,
                            expense.note,
                            parseFloat(expense.amount),
                            expense.date,
                            new Date(expense.createdAt.seconds * 1000),
                            new Date(expense.updatedAt.seconds * 1000)
                        );
    
                        resolve(expenseentity);
    
                    } else {
                        resolve(null);
                    }
    
                }
            ).catch((error) => {
                reject(error);
            });
        });    
    }
    find(qs: any): Promise<ExpenseEntity[]> {
        return new Promise((resolve, reject) => {

            const expensesCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(expensesCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const expenses: ExpenseEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const expense = doc.data();

                    const expenseentity = new ExpenseEntity(
                        doc.id,
                        expense.userId,
                        expense.accountId,
                        expense.categoryId,
                        expense.name,
                        expense.note,
                        parseFloat(expense.amount),
                        expense.date,
                        new Date(expense.createdAt.seconds * 1000),
                        new Date(expense.updatedAt.seconds * 1000)
                    );

                    expenses.push(expenseentity);

                });

                resolve(expenses);

            }).catch((error) => {
                reject(error);
            });

        });
    }

}