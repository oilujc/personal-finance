export default class GroupEntity {
    id: string;
    name: string;
    isActive: boolean;
    userId: string; // Owner
    color: string;
    
    members?: string[]; // Members
    

    constructor(id: string, name: string, isActive: boolean, userId: string, color: string, members: string[] = []) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.userId = userId;

        this.color = color;

        this.members = members;
    }

}
