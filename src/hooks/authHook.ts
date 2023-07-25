
import FirebaseAuthRepository from "../infrastructure/firebase/impl/FirebaseAuthRepository";
import AuthService from "../usecases/AuthService";

export const useAuth = () => {
    const authService = new AuthService(
        new FirebaseAuthRepository()
    );

    return {
        authService,
    }
}