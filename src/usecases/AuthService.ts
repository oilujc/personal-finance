import UserEntity from "../domain/entities/UserEntity";
import IAuthRepository from "../domain/repositories/IAuthRepository";

export default class AuthService {

    private authRepository: IAuthRepository;

    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository;
    }

    public async login(email: string, password: string): Promise<UserEntity> {
        return this.authRepository.login(email, password);
    }

    public async getCurrentUser(): Promise<UserEntity> {
        return this.authRepository.getCurrentUser();
    }

    public async logout(): Promise<boolean> {
        return this.authRepository.logout();
    }

    public async signup(email: string, password: string, firstName: string, lastName: string): Promise<UserEntity> {
        return this.authRepository.signup(email, password, firstName, lastName);
    }

}