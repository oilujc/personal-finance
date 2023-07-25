export default class UserPermissionEntity {
    id: string;
    userId: string;

    permissionId: string;

    constructor(id: string, userId: string, permissionId: string) {
        this.id = id;
        this.userId = userId;
        this.permissionId = permissionId;
    }
}
