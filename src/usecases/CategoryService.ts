import CategoryEntity from "../domain/entities/CategoryEntity";
import ICategoryRepository from "../domain/repositories/ICategoryRepository";

export default class CategoryService {
    private categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public async create(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepository.create(category);
    }

    public async update(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepository.update(category);
    }

    public async delete(id: string): Promise<boolean> {
        return this.categoryRepository.delete(id);
    }

    public async getById(id: string): Promise<CategoryEntity | null> {
        return this.categoryRepository.getById(id);
    }

    public async find(qs: any): Promise<CategoryEntity[]> {
        return this.categoryRepository.find(qs);
    }
    
}