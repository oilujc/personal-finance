import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import GroupEntity from "../domain/entities/GroupEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { ModalContext } from "../context/modalContext";
import { useService } from "../hooks/serviceHook";


interface GroupFormProps {
    defaultValue?: GroupEntity | null;
    callback?: () => Promise<void>;
}

const GroupForm: React.FC<GroupFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
    } = useForm();

    const [present] = useIonToast();

    const { groupService } = useService();
    const { user } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoadingContext);

    const newGroup = async (value: GroupEntity) => {
        try {

            const result = await groupService.create(value);

            if (callback !== undefined) {
                await callback();
            }

            setIsLoading(false);

            present({
                message: 'Grupo creado correctamente',
                duration: 3000,
                position: 'bottom'
            })
            
        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al crear el grupo',
                duration: 3000,
                position: 'bottom'
            })
        }
    }

    const updateGroup = async (value: GroupEntity ) => {

        try {
                
                const result = await groupService.update(value);
    
                if (callback !== undefined) {
                    await callback();
                }
    
                setIsLoading(false);
    
                present({
                    message: 'Grupo actualizado correctamente',
                    duration: 3000,
                    position: 'bottom'
                })
                
        } catch (error) {
            console.log(error);
    
            setIsLoading(false);
    
            present({
                message: 'Error al actualizar el grupo',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const colors = [
            'primary',
            'secondary',
            'tertiary',
            'success',
            'warning',
            'danger',
            'light'
        ]

        const group = new GroupEntity(
            defaultValue?.id || '',
            data.name,
            data.isActive ? true : false,
            user?.id || '',
            colors[Math.floor(Math.random() * colors.length)],
            [
                user?.id || ''
            ]
        );

        setIsLoading(true);

        if (!defaultValue) {
            newGroup(group);
        } else {
            updateGroup(group);
        }
      
            
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12'>
                        <IonText>
                            {defaultValue ? 'Editar grupo' : 'Nuevo grupo'}
                        </IonText>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Nombre
                            </IonLabel>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={defaultValue?.name || ''}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="text" />}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>

                        <IonItem>
                            <IonLabel>
                                ¿Activo?
                            </IonLabel>
                            <Controller
                                name="isActive"
                                control={control}
                                defaultValue={defaultValue?.isActive || false}
                                render={({ field: { onChange, value, onBlur } }) => <IonCheckbox onIonChange={onChange} value={value} onIonBlur={onBlur} labelPlacement="end" />}
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

export default GroupForm;