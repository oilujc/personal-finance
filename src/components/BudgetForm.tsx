import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BudgetEntity from "../domain/entities/BudgetEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";



interface BudgetFormProps {
    defaultValue?: BudgetEntity | null;
    callback?: (data?: any) => Promise<void>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
        register,
    } = useForm();

    const [present] = useIonToast();

    const { budgetService } = useService();
    const { user } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoadingContext);

    const periods = [
        {
            value: 'monthly',
            label: 'Mensual'
        },
        // {
        //     value: 'weekly',
        //     label: 'Semanal'
        // },
        // {
        //     value: 'biweekly',
        //     label: 'Quincenal'
        // },
        // {
        //     value: 'yearly',
        //     label: 'Anual'
        // }
    ]

    const newBudget = async (value: BudgetEntity) => {
        try {
            const result = await budgetService.create(value);

            if (callback !== undefined) {
                await callback({
                    account: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Presupuesto creado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al crear el presupuesto',
                duration: 3000,
                position: 'bottom'
            })
        }
    }

    const updateAccount = async (value: BudgetEntity) => {

        try {

            const result = await budgetService.update(value);

            if (callback !== undefined) {
                await callback({
                    account: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Presupuesto actualizado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al actualizar el presupuesto',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const amount: number = parseFloat(data.amount);

        let budget = new BudgetEntity(
            '',
            user ? user.id : '',
            data.name,
            amount,
            data.period,
        );

        if (defaultValue) {
            budget = defaultValue;

            budget.name = data.name;
            budget.amount = amount;
            budget.period = data.period;
        }

        setIsLoading(true);

        if (!defaultValue) {
            newBudget(budget);
        } else {
            updateAccount(budget);
        }


    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12'>
                        <IonText>
                            {defaultValue ? 'Editar presupuesto' : 'Nueva presupuesto'}
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
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Monto
                            </IonLabel>
                            <Controller
                                name="amount"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.amount : 0}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="number" />}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Periodo
                            </IonLabel>
                            <IonSelect label="Periodo" placeholder="Selecciona un periodo"
                                {...register("period", { required: true , value: defaultValue ? defaultValue.period : ''})} >

                                {
                                    periods.map((item: any, index: number) => (
                                        <IonSelectOption key={index} value={item.value}>{item.label}</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
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

export default BudgetForm;