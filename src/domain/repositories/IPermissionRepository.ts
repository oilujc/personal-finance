import PermissionEntity from "../entities/PermissionEntity";

export default interface IPermissionRepository {

    create(permission: PermissionEntity): Promise<PermissionEntity>;

    update(permission: PermissionEntity): Promise<PermissionEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<PermissionEntity>;

    find(
        qs: any,
    ): Promise<PermissionEntity[]>;

}