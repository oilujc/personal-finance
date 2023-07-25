import CategoryEntity from "../entities/CategoryEntity";

export default interface ICategoryRepository {
    
    create(category: CategoryEntity): Promise<CategoryEntity>;

    update(category: CategoryEntity): Promise<CategoryEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<CategoryEntity>;

    find(
        qs: Object,
    ): Promise<CategoryEntity[]>;

}