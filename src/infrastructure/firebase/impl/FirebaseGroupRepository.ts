import GroupEntity from "../../../domain/entities/GroupEntity";
import IGroupRepository from "../../../domain/repositories/IGroupRepository";

import { db } from "../firebase";

import { collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import getContraints from "../getConstraints";

export default class FirebaseGroupRepository implements IGroupRepository {

    private collectionName = "groups";

    create(group: GroupEntity): Promise<GroupEntity> {
        return new Promise((resolve, reject) => {

            const groupCollection = collection(db, this.collectionName);

            addDoc(groupCollection, {
                name: group.name,
                members: group.members,
                color: group.color,
                isActive: group.isActive,
                userId: group.userId,
            }).then((docRef) => {

                const id = docRef.id;

                const groupEntity = new GroupEntity(
                    id,
                    group.name,
                    group.isActive,
                    group.userId,
                    group.color,
                    group.members
                );

                resolve(groupEntity);

            }).catch((error) => {
                reject(error);
            });
        });
    }


    update(group: GroupEntity): Promise<GroupEntity> {

        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, group.id);

            updateDoc(docRef, {
                name: group.name,
                members: group.members,
                color: group.color,
                isActive: group.isActive,
                userId: group.userId,
            }).then(() => {
                resolve(group);
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

    getById(id: string): Promise<GroupEntity | null> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {
                    
                    if (doc.exists()) {
    
                        const group = doc.data();
    
                        const groupEntity = new GroupEntity(
                            doc.id,
                            group.name,
                            group.isActive,
                            group.userId,
                            group.color,
                            group.members
                        );
    
                        resolve(groupEntity);
    
                    } else {
                        resolve(null);
                    }
    
                }
            ).catch((error) => {
                reject(error);
            });
        });       
    }

    find(qs: any): Promise<GroupEntity[]> {
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

                const groups: GroupEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const group = doc.data();

                    const groupEntity = new GroupEntity(
                        doc.id,
                        group.name,
                        group.isActive,
                        group.userId,
                        group.color,
                        group.members
                    );

                    groups.push(groupEntity);

                });

                resolve(groups);

            }).catch((error) => {
                reject(error);
            });

        });
    }


}