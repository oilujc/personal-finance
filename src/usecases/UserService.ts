import IUserRepository from "../domain/repositories/IUserRepository";

export default class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async find(qs: any) {
        return await this.userRepository.find(qs);
    }

    async getById(id: string) {
        return await this.userRepository.getById(id);
    }
    

}