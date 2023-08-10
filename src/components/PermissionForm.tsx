import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import GroupEntity from "../domain/entities/GroupEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import PermissionEntity from "../domain/entities/PermissionEntity";


interface PermissionFormProps {
    defaultValue?: PermissionEntity | null;
    callback?: () => Promise<void>;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
    } = useForm();

    const [present] = useIonToast();

    const { permissionService } = useService();

    const onCreate = async (value: PermissionEntity) => {
        try {

            const result = await permissionService.create(value);

            if (callback !== undefined) {
                await callback();
            }


            present({
                message: 'Permiso creado correctamente',
                duration: 3000,
                position: 'bottom'
            })
            
        } catch (error) {
            console.log(error);


            present({
                message: 'Error al crear el permiso',
                duration: 3000,
                position: 'bottom'
            })
        }
    }

    const onUpdate = async (value: PermissionEntity ) => {

        try {
                
                const result = await permissionService.update(value);
    
                if (callback !== undefined) {
                    await callback();
                }
    
    
                present({
                    message: 'Permiso actualizado correctamente',
                    duration: 3000,
                    position: 'bottom'
                })
                
        } catch (error) {
            console.log(error);
    
    
            present({
                message: 'Error al actualizar el permiso',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const permission = new PermissionEntity(
            defaultValue?.id || '',
            data.key,
            data.isDefault,
        );


        if (!defaultValue) {
            onCreate(permission);
        } else {
            onUpdate(permission);
        }
      
            
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12'>
                        <IonText>
                            {defaultValue ? 'Editar permiso' : 'Nuevo permiso'}
                        </IonText>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Key
                            </IonLabel>
                            <Controller
                                name="key"
                                control={control}
                                defaultValue={defaultValue?.key || ''}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="text" />}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>

                        <IonItem>
                            <IonLabel>
                                ¿Es el permiso por defecto?
                            </IonLabel>
                            <Controller
                                name="isDefault"
                                control={control}
                                defaultValue={defaultValue?.isDefault || false}
                                render={({ field: { onChange, value } }) => <IonCheckbox 
                                    onIonChange={({detail: { checked }}) => onChange(checked ? true : false)}
                                    checked={value}
                                    labelPlacement="end" />}
                                />
                        </IonItem>
                    </IonCol>

                    <IonCol size='12'>
                        <IonButton type="submit" expand='block' >Guardar</IonButton>
                    </IonCol>

                </IonRow>
            </form>
        </>
    );
}

export default PermissionForm;