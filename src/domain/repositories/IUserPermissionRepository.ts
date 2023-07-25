import UserPermissionEntity from "../entities/UserPermissionEntity";

export default interface IUserPermissionRepository {

    create(userPermission: UserPermissionEntity): Promise<UserPermissionEntity>;

    update(userPermission: UserPermissionEntity): Promise<UserPermissionEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<UserPermissionEntity>;

    find(
        qs: any,
    ): Promise<UserPermissionEntity[]>;

}