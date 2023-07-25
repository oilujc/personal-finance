import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import CategoryEntity from "../../../domain/entities/CategoryEntity";
import ICategoryRepository from "../../../domain/repositories/ICategoryRepository";
import { db } from "../firebase";
import getContraints from "../getConstraints";

export default class FirebaseCategoryRepository implements ICategoryRepository {


    private collectionName = "categories";

    create(category: CategoryEntity): Promise<CategoryEntity> {
        return new Promise((resolve, reject) => {

            const categoryCollection = collection(db, this.collectionName);

            addDoc(categoryCollection, {
                name: category.name,
                isActive: category.isActive,
                userId: category.userId,
                color: category.color,
                isDefault: category.isDefault,
            }).then((docRef) => {

                const id = docRef.id;

                category.id = id;
                resolve(category);

            }).catch((error) => {
                reject(error);
            });
        });
    }
    update(category: CategoryEntity): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    find(qs: any): Promise<CategoryEntity[]> {
        return new Promise((resolve, reject) => {

            const categoryCollection = collection(db, this.collectionName);

            const constraints: any[] = Object.keys(qs).map((key) => {

                if (typeof qs[key] === "string") {
                    return where(key, "==", qs[key]);
                }

                const constraint = getContraints(qs[key]['constraint']);
                const value = qs[key]['value'];

                return where(key, constraint, value);

            });

            const q = query(categoryCollection, ...constraints);


            getDocs(q).then((querySnapshot: any) => {

                const categories: CategoryEntity[] = [];

                querySnapshot.forEach((doc: any) => {

                    const category = doc.data();

                    const categoryEntity = new CategoryEntity(
                        doc.id,
                        category.name,
                        category.isActive,
                        category.userId,
                        category.color,
                        category.isDefault
                    );

                    categories.push(categoryEntity);

                });

                resolve(categories);

            }).catch((error) => {
                reject(error);
            });

        });
    }

}