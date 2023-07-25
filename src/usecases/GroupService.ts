import GroupEntity from "../domain/entities/GroupEntity";
import IGroupRepository from "../domain/repositories/IGroupRepository";

export default class GroupService {
    private groupRepository: IGroupRepository;

    constructor(groupRepository: IGroupRepository) {
        this.groupRepository = groupRepository;
    }
    
    public async create(group: GroupEntity): Promise<GroupEntity> {
        return this.groupRepository.create(group);
    }

    public async update(group: GroupEntity): Promise<GroupEntity> {
        return this.groupRepository.update(group);
    }

    public async delete(id: string): Promise<boolean> {
        return this.groupRepository.delete(id);
    }

    public async getById(id: string): Promise<GroupEntity | null> {
        return this.groupRepository.getById(id);
    }

    public async find(qs: any): Promise<GroupEntity[]> {
        return this.groupRepository.find(qs);
    }



}