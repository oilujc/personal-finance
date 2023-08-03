import { useContext, useEffect, useState } from 'react';
import AuthService from '../usecases/AuthService';
import UserEntity from '../domain/entities/UserEntity';
import PermissionEntity from '../domain/entities/PermissionEntity';



export const useAuthInit = (authService: AuthService) => {

    const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
    const [userPermissions, setUserPermissions] = useState<PermissionEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const user = await authService.getCurrentUser();
            
            setCurrentUser(user);
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return {
        currentUser,
        userPermissions,
        isLoading
    }
}

export default useAuthInit;