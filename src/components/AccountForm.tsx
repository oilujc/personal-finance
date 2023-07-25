import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountEntity from "../domain/entities/AccountEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";



interface AccountFormProps {
    defaultValue?: AccountEntity | null;
    callback?: (data?: any) => Promise<void>;
}

const AccountForm: React.FC<AccountFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
    } = useForm();

    const [present] = useIonToast();

    const { accountService } = useService();
    const { user } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoadingContext);

    const newAccount = async (value: AccountEntity) => {
        try {
            const result = await accountService.create(value);

            if (callback !== undefined) {
                await callback({
                    account: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Cuenta creada correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al crear la Cuenta',
                duration: 3000,
                position: 'bottom'
            })
        }
    }

    const updateAccount = async (value: AccountEntity) => {

        try {
            const result = await accountService.update(value);

            if (callback !== undefined) {
                await callback({
                    account: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Cuenta actualizada correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al actualizar la cuenta',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const initialAmount: number = parseFloat(data.initialAmount);

        let account = new AccountEntity(
            '',
            initialAmount,
            0,
            0,
            0,
            0,
            0,
            user?.id || '',
            data.isActive,
            data.name
        );

        if (defaultValue) {
            account = defaultValue;

            account.name = data.name;
            account.isActive = data.isActive;
        }

        setIsLoading(true);

        if (!defaultValue) {
            newAccount(account);
        } else {
            updateAccount(account);
        } 


    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            {defaultValue ? 'Editar cuenta' : 'Nueva cuenta'}
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
                                defaultValue={defaultValue ? defaultValue.name : ''}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="text" />}
                            />
                        </IonItem>
                    </IonCol>
                    {
                        !defaultValue && (
                            <IonCol size='12'>
                                <IonItem>
                                    <IonLabel>
                                        Monto inicial
                                    </IonLabel>
                                    <Controller
                                        name="initialAmount"
                                        control={control}
                                        defaultValue={0}
                                        render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="number" />}
                                    />
                                </IonItem>
                            </IonCol>
                        )
                    }


                    <IonCol size='12'>

                        <IonItem>
                            <IonLabel>
                                ¿Activo?
                            </IonLabel>
                            <Controller
                                name="isActive"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.isActive : true}
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

export default AccountForm;