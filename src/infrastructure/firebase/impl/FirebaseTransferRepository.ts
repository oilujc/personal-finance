import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import TransferEntity from "../../../domain/entities/TransferEntity";
import ITransferRepository from "../../../domain/repositories/ITransferRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseTransferRepository implements ITransferRepository {

    private collectionName = "transfers";


    create(transfer: TransferEntity): Promise<TransferEntity> {
        return new Promise((resolve, reject) => {

            const transferCollection = collection(db, this.collectionName);

            addDoc(transferCollection, {
                fromAccountId: transfer.fromAccountId,
                toAccountId: transfer.toAccountId,
                userId: transfer.userId,
                amount: transfer.amount,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then((docRef) => {

                const id = docRef.id;

                transfer.id = id;
                resolve(transfer);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    update(transfer: TransferEntity): Promise<TransferEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<TransferEntity | null> {
        throw new Error("Method not implemented.");
    }
    find(qs: any): Promise<TransferEntity[]> {
        return new Promise((resolve, reject) => {

            const transferCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(transferCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const transfers: TransferEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const transfer = doc.data();

                    const transferEntity = new TransferEntity(
                        doc.id,
                        transfer.fromAccountId,
                        transfer.toAccountId,
                        transfer.userId,
                        transfer.amount,
                        transfer.createdAt,
                        transfer.updatedAt,
                    );
                    

                    transfers.push(transferEntity);

                });

                resolve(transfers);

            }).catch((error) => {
                reject(error);
            });

        });
    }

}