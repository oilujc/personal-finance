import UserEntity from "../entities/UserEntity";

export default interface IUserRepository {
    
    getById(id: string): Promise<UserEntity>;

    find(
        qs: any,
    ): Promise<UserEntity[]>;

}