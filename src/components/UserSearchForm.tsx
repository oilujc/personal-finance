import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText, useIonToast } from "@ionic/react";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import PermissionEntity from "../domain/entities/PermissionEntity";


interface UserSearchFormProps {
    defaultValue?: PermissionEntity | null;
    callback?: (value: any) => Promise<void>;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
    } = useForm();

    const [present] = useIonToast();

    const { userService } = useService();

    const onSearch = async (value: string) => {

        try {

            const users = await userService.find({
                email: value
            });

            if (users.length > 0) {

                const user = users[0];
                
                
                callback && callback(user);
            } else {
                present({
                    message: 'Usuario no encontrado',
                    duration: 2000,
                    color: 'danger'
                });
            }

        } catch (error) {
            present({
                message: 'Error al buscar usuario',
                duration: 2000,
                color: 'danger'
            });
        } finally {
            console.log('finally')
        }
    }

    const onSubmit = async (data: any) => {
        onSearch(data.email);
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12'>
                        <IonText>
                            Buscar usuario
                        </IonText>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Correo
                            </IonLabel>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue={defaultValue?.key || ''}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="text" />}
                            />
                        </IonItem>
                    </IonCol>
    
                    <IonCol size='12'>
                        <IonButton type="submit" expand='block' >Buscar</IonButton>
                    </IonCol>

                </IonRow>
            </form>
        </>
    );
}

export default UserSearchForm;