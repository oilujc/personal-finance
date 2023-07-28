import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountEntity from "../domain/entities/AccountEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import TransferEntity from "../domain/entities/TransferEntity";
import errorCode from "../utils/ErrorCode";

interface TransferCreateData {
    fromAccount: AccountEntity;
    toAccount: AccountEntity;
    amount: number;
    userId: string;
}

interface TransferFormProps {
    accounts: AccountEntity[];
    callback?: (data?: any) => Promise<void>;
}

const TransferForm: React.FC<TransferFormProps> = ({ accounts, callback }) => {

    const {
        control,
        handleSubmit,
        register,
    } = useForm();

    const [present] = useIonToast();

    const { transferService } = useService();
    const { user } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoadingContext);

    const newTransfer = async (value: TransferCreateData) => {
        try {
            const result = await transferService.create(value);

            if (callback !== undefined) {
                await callback({
                    transfer: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Transferencia creada correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al crear la Transferencia',
                duration: 3000,
                position: 'bottom'
            })
        }
    }


    const onSubmit = async (data: any) => {

        const amount: number = parseFloat(data.amount);

        const transferData = {
            fromAccount: data.fromAccount,
            toAccount: data.toAccount,
            amount: amount,
            userId: user ? user.id : ''
        }

        if (transferData.fromAccount.id === transferData.toAccount.id) {
            present({
                message: 'Las cuentas deben ser diferentes',
                duration: 3000,
                position: 'bottom'
            })
            return;
        }

        if (transferData.fromAccount.currentAmount < amount) {
            present({
                message: 'El monto a transferir es mayor al saldo de la cuenta',
                duration: 3000,
                position: 'bottom'
            })
            return;
        }

        setIsLoading(true);
        newTransfer(transferData);

      
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            Nueva transferencia
                        </IonText>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Desde
                            </IonLabel>
                            <IonSelect label="Desde" placeholder="Selecciona una cuenta"
                                {...register("fromAccount", { required: true })}>

                                {
                                    accounts.map((account: any) => (
                                        <IonSelectOption key={account.id} value={account}>{account.name} ({account.currentAmount} $)</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Hasta
                            </IonLabel>
                            <IonSelect label="Hasta" placeholder="Selecciona una cuenta"
                                {...register("toAccount", { required: true })}>

                                {
                                    accounts.map((account: any) => (
                                        <IonSelectOption key={account.id} value={account}>{account.name} ({account.currentAmount} $)</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
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
                                defaultValue={0}
                                rules={{ required: true, min: 1 }}
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

export default TransferForm;