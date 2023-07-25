import GroupEntity from "../entities/GroupEntity";

export default interface IGroupRepository {
    
    create(group: GroupEntity): Promise<GroupEntity>;

    update(group: GroupEntity): Promise<GroupEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<GroupEntity | null>;

    find(
        qs: Object,
    ): Promise<GroupEntity[]>;

}