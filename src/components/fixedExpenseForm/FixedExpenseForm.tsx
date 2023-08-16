import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FixedExpenseEntity from "../../domain/entities/FixedExpenseEntity";
import { useService } from "../../hooks/serviceHook";
import { AuthContext } from "../../context/authContext";


interface FixedExpenseFormProps {
    defaultValue?: FixedExpenseEntity | null;
    callback?: (data?: any) => Promise<void>;
}

const FixedExpenseForm: React.FC<FixedExpenseFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        handleSubmit,
        register,
    } = useForm();

    const [present] = useIonToast();

    const { fixedExpenseService } = useService();
    const { user } = useContext(AuthContext);

    const newFixedExpense = async (value: FixedExpenseEntity) => {
        try {
            const result = await fixedExpenseService.create(value);

            if (callback !== undefined) {
                await callback({
                    data: result
                });
            }

            present({
                message: 'Gasto fijo creado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            present({
                message: 'Error al crear el Gasto fijo',
                duration: 3000,
                position: 'bottom'
            })
        }
    }

    const updateAccount = async (value: FixedExpenseEntity) => {

        try {

            const result = await fixedExpenseService.update(value);

            if (callback !== undefined) {
                await callback({
                    data: result
                });
            }

            present({
                message: 'Gasto fijo actualizado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            present({
                message: 'Error al actualizar el Gasto fijo',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const amount: number = parseFloat(data.amount);
        const dateFormatted: number = parseInt(data.date);


        let entity = new FixedExpenseEntity(
            '',
            user ? user.id : '',
            data.name,
            amount,
            dateFormatted,
        );

        if (defaultValue) {
            entity = defaultValue;

            entity.name = data.name;
            entity.amount = amount;
            entity.date = dateFormatted;
        }

        if (!defaultValue) {
            newFixedExpense(entity);
        } else {
            updateAccount(entity);
        }


    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            {defaultValue ? 'Editar Gasto fijo' : 'Nuevo Gasto fijo'}
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
                                defaultValue={defaultValue ? defaultValue.amount : ''}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput
                                    onIonChange={onChange} value={value} onIonBlur={onBlur} pattern="^[0-9]+([.][0-9]{1,2})?$" inputMode="decimal" type="text" />}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Dia de pago
                            </IonLabel>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.date : 0}
                                rules={{ required: true, min: 1, max: 31 }}
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

export default FixedExpenseForm;