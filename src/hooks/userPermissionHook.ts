import { useEffect, useState } from "react";
import { useService } from "./serviceHook";
import UserEntity from "../domain/entities/UserEntity";
import PermissionEntity from "../domain/entities/PermissionEntity";
import UserPermissionEntity from "../domain/entities/UserPermissionEntity";


const useUserPermission = () => {

    const { permissionService, userPermissionService } = useService();

    const getPermissions = async (user: UserEntity) => {
        try {
            const userPermission = await userPermissionService.find({
                userId: {
                    constraint: 'eq',
                    value: user.id
                }
            });
    
            const permissions = await userPermission.reduce(async (acc: Promise<PermissionEntity[]>, up: UserPermissionEntity) => {
                const permission = await permissionService.getById(up.permissionId);

                if (permission) {
                    const prev = await acc;
                    return [...prev, permission];
                }

                return await acc;

            }, Promise.resolve([]));

            return permissions;
    
            

        } catch (error) {
            console.log('error', error);
            return [];
        }
       
    }

    return {
        getPermissions
    }
}

export default useUserPermission;