import { createContext } from 'react';
import UserEntity from '../domain/entities/UserEntity';
import PermissionEntity from '../domain/entities/PermissionEntity';

interface IAuthContext {
    user: UserEntity | null;
    permissions: PermissionEntity[];
    setUser: (user: UserEntity | null) => void;
    setPermissions: (permissions: PermissionEntity[]) => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    permissions: [],
    setUser: () => {
        throw new Error('setUser function must be overridden');
    },
    setPermissions: () => {
        throw new Error('setPermissions function must be overridden');
    }
});
