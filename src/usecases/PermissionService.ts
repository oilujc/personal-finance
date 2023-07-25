import PermissionEntity from "../domain/entities/PermissionEntity";
import IPermissionRepository from "../domain/repositories/IPermissionRepository";

export default class PermissionService {
    private permissionRepository: IPermissionRepository;

    constructor(permissionRepository: IPermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async create(permission: PermissionEntity): Promise<PermissionEntity> {
        return this.permissionRepository.create(permission);
    }

    public async update(permission: PermissionEntity): Promise<PermissionEntity> {
        return this.permissionRepository.update(permission);
    }

    public async delete(id: string): Promise<boolean> {
        return this.permissionRepository.delete(id);
    }

    public async getById(id: string): Promise<PermissionEntity> {
        return this.permissionRepository.getById(id);
    }

    public async find(qs: any): Promise<PermissionEntity[]> {
        return this.permissionRepository.find(qs);
    }
}