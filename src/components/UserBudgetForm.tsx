import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import UserTrackEntity from "../domain/entities/UserTrackEntity";



interface UserBudgetFormProps {
    defaultValue: UserTrackEntity;
    callback?: (data?: any) => Promise<void>;
}

const UserBudgetForm: React.FC<UserBudgetFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
    } = useForm();

    const [present] = useIonToast();

    const { userBudgetService } = useService();
    const { setIsLoading } = useContext(LoadingContext);


    const updateAccount = async (value: UserTrackEntity) => {

        try {
            console.log(value);

            const result = await userBudgetService.update(value);

            if (callback !== undefined) {
                await callback({
                    account: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Presupuesto mensual actualizado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al actualizar el presupuesto mensual',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const budgetMonthMax: number = data.budgetMonthMax;
        defaultValue.budgetMonthMax = budgetMonthMax;

        setIsLoading(true);
        updateAccount(defaultValue);


    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            {defaultValue ? 'Editar presupuesto mensual' : ''}
                        </IonText>
                    </IonCol>

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Presupuesto por mes
                            </IonLabel>
                            <Controller
                                name="budgetMonthMax"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.budgetMonthMax : 0}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="number" />}
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

export default UserBudgetForm;