import UserTrackEntity from "../entities/UserTrackEntity";

export default interface IUserTrackRepository {

    create(UserTrack: UserTrackEntity): Promise<UserTrackEntity>;

    update(UserTrack: UserTrackEntity): Promise<UserTrackEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<UserTrackEntity>;

    getOne(qs: any): Promise<UserTrackEntity | null>;

    find(
        qs: any,
    ): Promise<UserTrackEntity[]>;
}