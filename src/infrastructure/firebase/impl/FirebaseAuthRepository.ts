import UserEntity from "../../../domain/entities/UserEntity";
import IAuthRepository from "../../../domain/repositories/IAuthRepository";


import { signInWithEmailAndPassword, onAuthStateChanged, UserCredential, AuthError, signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

import errorCode from "../../../utils/ErrorCode";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export default class FirebaseAuthRepository implements IAuthRepository {

    private collectionName = "users";

    public async login(email: string, password: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                const user = userCredential.user;

                const id = user?.uid;

                const firstName = user?.displayName?.split(" ")[0];
                const lastName = user?.displayName?.split(" ")[1];

                if (user) {
                    const userEntity = new UserEntity(
                        id ? id : "",
                        firstName ? firstName : "",
                        lastName ? lastName : "",
                        user.email ? user.email : ""
                    );

                    resolve(userEntity);
                } else {

                    reject(errorCode("auth/user-not-found"));
                }

            })
            .catch((error: AuthError) => {
                const code = error.code;
                reject(errorCode(code));
            });
        });
    }

    public async signup(email: string, password: string, firstName: string, lastName: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {

                const userCollection = collection(db, this.collectionName);
                
                const user = userCredential.user;

                const id = user?.uid;

                if (user) {
                    const userEntity = new UserEntity(
                        id ? id : "",
                        firstName,
                        lastName,
                        user.email ? user.email : ""
                    );
                    
                    updateProfile(user, {
                        displayName: `${firstName} ${lastName}`
                    })

                    addDoc(userCollection, {
                        userId: id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    }).then((docRef) => {

                        resolve(userEntity);

        
                    }).catch((error) => {
                        reject(error);
                    });

                } else {
                    reject(errorCode("auth/user-not-found"));
                }

            })
            .catch((error: AuthError) => {
                const code = error.code;
                reject(errorCode(code));
            });
        });
    }

    public async getCurrentUser(): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {

                    const id = user?.uid;

                    const firstName = user?.displayName?.split(" ")[0];
                    const lastName = user?.displayName?.split(" ")[1];

                    const userEntity = new UserEntity(
                        id ? id : "",
                        firstName ? firstName : "",
                        lastName ? lastName : "",
                        user.email ? user.email : ""
                    );

                    resolve(userEntity);
                } else {
                    reject(errorCode("auth/user-not-found"));
                }
            });
        });
    }

    public async updateCurrentUser(user: UserEntity): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            
            const authUser = auth.currentUser;

            if (authUser) {
                updateProfile(authUser, {
                    displayName: `${user.firstName} ${user.lastName}`
                })
                .then(() => {

                    const docRef = doc(db, this.collectionName, authUser.uid);

                    updateDoc(docRef, {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    }).then(() => {
                        resolve(user);
                    }).catch((error) => {
                        reject(error);
                    });
                
                })
                .catch((error: AuthError) => {
                    const code = error.code;

                    console.log(code)

                    reject(errorCode(code));
                });
            } else {
                reject(errorCode("auth/user-not-found"));
            }
        
        });
    
    }


    public async logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            signOut(auth)
            .then(() => {
                resolve(true);
            })
            .catch((error: AuthError) => {
                const code = error.code;
                const errorMessage = error.message;

                console.log(code, errorMessage)

                reject(errorCode(code));
            });
        });
    }




}

