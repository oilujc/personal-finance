import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import AccountEntity from "../../../domain/entities/AccountEntity";
import IAccountRepository from "../../../domain/repositories/IAccountRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseAccountRepository implements IAccountRepository {

    private collectionName = "accounts";

    create(account: AccountEntity): Promise<AccountEntity> {
        return new Promise((resolve, reject) => {

            const accountsCollection = collection(db, this.collectionName);

            addDoc(accountsCollection, {
                name: account.name,
                isActive: account.isActive,
                userId: account.userId,
                initialAmount: account.initialAmount,
                currentAmount: account.initialAmount,
                totalExpenses: account.totalExpenses,
                totalIncomes: account.totalIncomes,
                totalTransfersIn: account.totalTransfersIn,
                totalTransfersOut: account.totalTransfersOut,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).then((docRef) => {

                const id = docRef.id;

                account.id = id;
                resolve(account);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    update(account: AccountEntity): Promise<AccountEntity> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, account.id);

            
            updateDoc(docRef, {
                name: account.name,
                isActive: account.isActive,
                userId: account.userId,
                initialAmount: account.initialAmount,
                currentAmount: account.currentAmount,
                totalExpenses: account.totalExpenses,
                totalIncomes: account.totalIncomes,
                totalTransfersIn: account.totalTransfersIn,
                totalTransfersOut: account.totalTransfersOut,
                createdAt: account.createdAt,
                updatedAt: new Date(),
            }).then(() => {
                resolve(account);
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
    getById(id: string): Promise<AccountEntity | null> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {
                    
                    if (doc.exists()) {
    
                        const account = doc.data();
    
                        const accountEntity = new AccountEntity(
                            doc.id,
                            parseFloat(account.initialAmount),
                            parseFloat(account.currentAmount),
                            parseFloat(account.totalExpenses),
                            parseFloat(account.totalIncomes),
                            parseFloat(account.totalTransfersIn),
                            parseFloat(account.totalTransfersOut),
                            account.userId,
                            account.isActive,
                            account.name,
                            account.createdAt,
                            account.updatedAt,
                        );

                        resolve(accountEntity);
    
                    } else {
                        resolve(null);
                    }
    
                }
            ).catch((error) => {
                reject(error);
            });
        });    
    }
    find(qs: any): Promise<AccountEntity[]> {
        return new Promise((resolve, reject) => {

            const accountsCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(accountsCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const accounts: AccountEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const account = doc.data();

                    const accountEntity = new AccountEntity(
                        doc.id,
                        parseFloat(account.initialAmount),
                        parseFloat(account.currentAmount),
                        parseFloat(account.totalExpenses),
                        parseFloat(account.totalIncomes),
                        parseFloat(account.totalTransfersIn),
                        parseFloat(account.totalTransfersOut),
                        account.userId,
                        account.isActive,
                        account.name,
                        account.createdAt,
                        account.updatedAt,
                    );

                    accounts.push(accountEntity);

                });

                resolve(accounts);

            }).catch((error) => {
                reject(error);
            });

        });
    }
    
}