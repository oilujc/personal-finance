import UserEntity from "../entities/UserEntity"

export default interface IAuthRepository {
    
    login(email: string, password: string): Promise<UserEntity>;

    signup(email: string, password: string, firstName: string, lastName: string): Promise<UserEntity>;

    logout(): Promise<boolean>;

    getCurrentUser(): Promise<UserEntity>;

    updateCurrentUser(user: UserEntity): Promise<UserEntity>;




}