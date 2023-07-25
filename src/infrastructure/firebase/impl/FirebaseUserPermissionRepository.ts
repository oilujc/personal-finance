import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import UserPermissionEntity from "../../../domain/entities/UserPermissionEntity";
import IUserPermissionRepository from "../../../domain/repositories/IUserPermissionRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseUserPermissionRepository implements IUserPermissionRepository {

    private collectionName = "userPermissions";

    create(userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
        return new Promise((resolve, reject) => {

            const userPermissionCollection = collection(db, this.collectionName);

            addDoc(userPermissionCollection, {
                userId: userPermission.userId,
                permissionId: userPermission.permissionId,
            }).then((docRef) => {

                const id = docRef.id;

                userPermission.id = id;
                resolve(userPermission);

            }).catch((error) => {
                reject(error);
            });
        });
    }

    update(userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, userPermission.id);

            updateDoc(docRef, {
                userId: userPermission.userId,
                permissionId: userPermission.permissionId,
            }).then(() => {
                resolve(userPermission);
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
    
    getById(id: string): Promise<UserPermissionEntity> {
        throw new Error("Method not implemented.");
    }

    find(qs: any): Promise<UserPermissionEntity[]> {
        return new Promise((resolve, reject) => {

            const groupCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(groupCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const users: UserPermissionEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const userPermission = doc.data();

                    const userPermissionEntity = new UserPermissionEntity(
                        doc.id,
                        userPermission.userId,
                        userPermission.permissionId
                    );

                    users.push(userPermissionEntity);

                });

                resolve(users);

            }).catch((error) => {
                reject(error);
            });

        });
    }

}

