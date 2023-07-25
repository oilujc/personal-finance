import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import IncomeEntity from "../../../domain/entities/IncomeEntity";
import IIncomeRepository from "../../../domain/repositories/IIncomeRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseIncomeRepository implements IIncomeRepository {

    private collectionName = "incomes";

    create(income: IncomeEntity): Promise<IncomeEntity> {
        return new Promise((resolve, reject) => {

            const incomesCollection = collection(db, this.collectionName);

            addDoc(incomesCollection, {
                name: income.name,
                note: income.note,
                amount: income.amount,
                userId: income.userId,
                accountId: income.accountId,
                date: income.date,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then((docRef) => {

                const id = docRef.id;

                income.id = id;
                resolve(income);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    update(income: IncomeEntity): Promise<IncomeEntity> {
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
    getById(id: string): Promise<IncomeEntity | null> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {
                    
                    if (doc.exists()) {
    
                        const income = doc.data();
    
                        const incomeEntity = new IncomeEntity(
                            doc.id,
                            income.userId,
                            income.accountId,
                            income.name,
                            income.note,
                            parseFloat(income.amount),
                            income.date,
                            new Date(income.createdAt.seconds * 1000),
                            new Date(income.updatedAt.seconds * 1000)
                        );
    
                        resolve(incomeEntity);
    
                    } else {
                        resolve(null);
                    }
    
                }
            ).catch((error) => {
                reject(error);
            });
        });    
    }
    find(qs: any): Promise<IncomeEntity[]> {
        return new Promise((resolve, reject) => {

            const incomesCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(incomesCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const incomes: IncomeEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const income = doc.data();

                    const incomeEntity = new IncomeEntity(
                        doc.id,
                        income.userId,
                        income.accountId,
                        income.name,
                        income.note,
                        parseFloat(income.amount),
                        income.date,
                        new Date(income.createdAt.seconds * 1000),
                        new Date(income.updatedAt.seconds * 1000)

                    );

                    incomes.push(incomeEntity);

                });

                resolve(incomes);

            }).catch((error) => {
                reject(error);
            });

        });
    }

}