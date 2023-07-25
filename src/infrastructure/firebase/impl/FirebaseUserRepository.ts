import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import UserEntity from "../../../domain/entities/UserEntity";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";
import errorCode from "../../../utils/ErrorCode";

export default class FirebaseUserRepository implements IUserRepository {

    private collectionName = "users";

    getById(id: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {

            const docRef = doc(db, this.collectionName, id);

            getDoc(docRef).then((doc) => {
                    
                    if (doc.exists()) {
    
                        const user = doc.data();
    
                        const userEntity = new UserEntity(
                            user.userId,
                            user.firstName,
                            user.lastName,
                            user.email
                        );
    
                        resolve(userEntity);
    
                    } else {
                        reject(errorCode("auth/user-not-found"));
                    }
    
                }
            ).catch((error) => {
                reject(error);
            });
        }); 
    }

    find(qs: any): Promise<UserEntity[]> {
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

                const users: UserEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const user = doc.data();

                    const userEntity = new UserEntity(
                        user.userId,
                        user.firstName,
                        user.lastName,
                        user.email
                    );

                    users.push(userEntity);

                });

                resolve(users);

            }).catch((error) => {
                reject(error);
            });

        });

    }

}