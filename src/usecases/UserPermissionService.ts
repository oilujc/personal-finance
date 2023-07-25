import UserPermissionEntity from "../domain/entities/UserPermissionEntity";
import IUserPermissionRepository from "../domain/repositories/IUserPermissionRepository";

export default class UserPermissionService {

    private userPermissionRepository: IUserPermissionRepository;

    constructor(userPermissionRepository: IUserPermissionRepository) {
        this.userPermissionRepository = userPermissionRepository;
    }

    public async create(userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
        return this.userPermissionRepository.create(userPermission);
    }

    public async update(userPermission: UserPermissionEntity): Promise<UserPermissionEntity> {
        return this.userPermissionRepository.update(userPermission);
    }

    public async delete(id: string): Promise<boolean> {
        return this.userPermissionRepository.delete(id);
    }

    public async getById(id: string): Promise<UserPermissionEntity | null> {
        return this.userPermissionRepository.getById(id);
    }

    public async find(qs: any): Promise<UserPermissionEntity[]> {
        return this.userPermissionRepository.find(qs);
    }
    
}