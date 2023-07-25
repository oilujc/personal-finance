import { useEffect, useState } from 'react';
import AuthService from '../usecases/AuthService';
import UserEntity from '../domain/entities/UserEntity';
import PermissionEntity from '../domain/entities/PermissionEntity';



export const useAuthInit = (authService: AuthService) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
    const [userPermissions, setUserPermissions] = useState<PermissionEntity[]>([]);


    const fetchCurrentUser = async () => {
        try {
            const user = await authService.getCurrentUser();

            setCurrentUser(user);
            setLoading(false);        
        
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return {
        loading,
        currentUser,
        userPermissions
    }
}

export default useAuthInit;