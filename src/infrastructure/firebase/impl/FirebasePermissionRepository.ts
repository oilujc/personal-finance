import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import PermissionEntity from "../../../domain/entities/PermissionEntity";
import IPermissionRepository from "../../../domain/repositories/IPermissionRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";
import errorCode from "../../../utils/ErrorCode";

export default class FirebasePermissionRepository implements IPermissionRepository {

    private collectionName = "permissions";


    create(permission: PermissionEntity): Promise<PermissionEntity> {
        return new Promise((resolve, reject) => {
            const permissionCollection = collection(db, this.collectionName);

            addDoc(permissionCollection, {
                key: permission.key,
                isDefault: permission.isDefault,
            }).then((docRef) => {

                const id = docRef.id;

                permission.id = id;
                resolve(permission);

            }).catch((error) => {
                reject(error);
            });
        });
    }

    update(permission: PermissionEntity): Promise<PermissionEntity> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, permission.id);

            updateDoc(docRef, {
                key: permission.key,
                isDefault: permission.isDefault,
            }).then(() => {
                resolve(permission);
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
        }

        );
    }

    getById(id: string): Promise<PermissionEntity> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {
                    
                    if (doc.exists()) {
    
                        const permission = doc.data();
    
                        const permissionEntity = new PermissionEntity(
                            doc.id,
                            permission.key,
                            permission.isDefault
                        );
    
                        resolve(permissionEntity);
    
                    } else {
                        reject(errorCode('permission/not-found'))
                    }
    
                }
            ).catch((error) => {
                reject(error);
            });
        });       
    }

    find(qs: any): Promise<PermissionEntity[]> {
        return new Promise((resolve, reject) => {
            const itemCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(itemCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const permissions: PermissionEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const permission = doc.data();

                    const permissionEntity = new PermissionEntity(
                        doc.id,
                        permission.key,
                        permission.isDefault
                    );

                    permissions.push(permissionEntity);

                });

                resolve(permissions);

            }).catch((error) => {
                reject(error);
            });

        });
    }
}

