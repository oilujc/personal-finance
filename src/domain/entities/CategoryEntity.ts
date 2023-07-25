export default class CategoryEntity {
    id: string;
    name: string;
    isActive: boolean;
    color: string;
    userId: string;
    
    isDefault?: boolean;

    constructor(id: string, name: string, isActive: boolean, userId: string, color: string, isDefault = false) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.userId = userId;

        this.color = color;
        this.isDefault = isDefault;
    }
}
