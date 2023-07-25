import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonList, IonRow, IonText, useIonToast, useIonViewWillEnter } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import PermissionEntity from "../domain/entities/PermissionEntity";
import UserPermissionEntity from "../domain/entities/UserPermissionEntity";
import UserEntity from "../domain/entities/UserEntity";


interface UserPermissionFormProps {
    defaultValue: UserEntity | null;
    callback?: (value: any) => Promise<void>;
}

interface ConditionalInputProps {
    control: any;
    index: string;
    defaultValue: boolean;
    label: string;
}


const ConditionalInput: React.FC<ConditionalInputProps> = ({ control, index, defaultValue }: any) => {

    return (
        <Controller
            name={`permissions.${index}.value`}
            control={control}
            defaultValue={defaultValue ? defaultValue : false}
            render={({ field: { onChange, value } }) => <IonCheckbox
                onIonChange={({ detail: { checked } }) => onChange(checked ? true : false)}
                checked={
                    value
                }
                labelPlacement="end" />}
        />
    )

}






const UserPermissionForm: React.FC<UserPermissionFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
    } = useForm();

    const {
        fields,
        append,
        prepend,
    } = useFieldArray({
        control,
        name: 'permissions'
    });

    const [present] = useIonToast();

    const { setIsLoading } = useContext(LoadingContext);

    const [permissions, setPermissions] = useState<PermissionEntity[]>([]);
    const [userPermission, setUserPermission] = useState<UserPermissionEntity[]>([]);


    const { permissionService, userPermissionService } = useService();

    const getPermissions = async () => {
        const data = await permissionService.find({});

        setPermissions(data);
    }

    const getUserPermission = async () => {

        if (!defaultValue?.id) {
            return;
        }

        const data = await userPermissionService.find({
            userId: {
                'constraint': 'eq',
                'value': defaultValue?.id
            }
        });

        console.log('data', data, defaultValue)

        setUserPermission(data);
    }


    const onCreate = async (elements: any) => {

        if (!defaultValue?.id) {
            return;
        }

        Object.entries(elements).forEach(async ([index, value]: [string, any]) => {

            const permissionFind = userPermission.find(
                (item: UserPermissionEntity) => item.permissionId === index
            );

            console.log('permissionFind', permissionFind)

            if (permissionFind && !value?.value) {

                console.log('delete', permissionFind.id)

                await userPermissionService.delete(permissionFind.id);
                return;
            }

            if (permissionFind && value?.value) {
                return;
            }

            const userPermissionEntity = new UserPermissionEntity('', defaultValue.id, index);

            console.log('userPermissionEntity', userPermissionEntity)

            await userPermissionService.create(userPermissionEntity);
        });



        if (callback !== undefined) {
            await callback(true);
        }

        setIsLoading(false);

        present({
            message: 'Permisos actualizados',
            duration: 2000,
            color: 'success'
        });


    }

    const onSubmit = async (data: any) => {
        setIsLoading(true);

        const elements = data.permissions;

        await onCreate(elements);

    }

    useEffect(() => {

        console.log('defaultValue', defaultValue)
        console.log('userPermission', userPermission)
        getPermissions();

    }, [userPermission]);


    useEffect(() => {

        setPermissions([]);
        setUserPermission([]);

        control._reset({
            permissions: []
        });


        getUserPermission();

    }, [defaultValue]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12'>
                        <IonList>
                            {
                                (userPermission && permissions) && (
                                    permissions.map((permission, index) => (
                                        <IonItem key={index}>
                                            <IonLabel>{permission.key}</IonLabel>
                                            {
                                                <ConditionalInput control={control} index={permission.id} label={permission.key} defaultValue={
                                                    userPermission.find((item: UserPermissionEntity) => item.permissionId === permission.id) ? true : false
                                                } />
                                            }
                                        </IonItem>
                                    ))
                                )
                            }
                        </IonList>
                    </IonCol>

                    <IonCol size='12'>
                        <IonButton type="submit" expand='block' >Guardar</IonButton>
                    </IonCol>

                </IonRow>
            </form>
        </>
    );
}

export default UserPermissionForm;