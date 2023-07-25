import UserTrackEntity from "../domain/entities/UserTrackEntity";
import IUserTrackRepository from "../domain/repositories/IUserTrackRepository";


export interface IUserTrackService {

    create(userTrack: UserTrackEntity): Promise<UserTrackEntity>;

    update(userTrack: UserTrackEntity): Promise<UserTrackEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<UserTrackEntity | null>;

    getOne(qs: any): Promise<UserTrackEntity | null>;

    find(
        qs: any,
    ): Promise<UserTrackEntity[]>;
        
}

export default class UserTrackService implements IUserTrackService {

    private userTrackRepository: IUserTrackRepository;

    constructor(
        userTrackRepository: IUserTrackRepository,
    ) {
        this.userTrackRepository = userTrackRepository;
    }

    async create(userTrack: UserTrackEntity): Promise<UserTrackEntity> {

        return this.userTrackRepository.create(userTrack);
    }

    update(userTrack: UserTrackEntity): Promise<UserTrackEntity> {
        return this.userTrackRepository.update(userTrack);
    }

    delete(id: string): Promise<boolean> {
        return this.userTrackRepository.delete(id);
    }

    getById(id: string): Promise<UserTrackEntity | null> {
        return this.userTrackRepository.getById(id);
    }

    getOne(qs: any): Promise<UserTrackEntity | null> {
        return this.userTrackRepository.getOne(qs);
    }

    find(
        qs: any,
    ): Promise<UserTrackEntity[]> {
        return this.userTrackRepository.find(qs);
    }

}