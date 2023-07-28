import { IonButton, IonCheckbox, IonCol, IonDatetime, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, useIonToast } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountEntity from "../domain/entities/AccountEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import IncomeEntity from "../domain/entities/IncomeEntity";


interface IncomeFormProps {
    callback?: (data?: any) => Promise<void>;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ callback }) => {

    const {
        control,
        handleSubmit,
        register,
    } = useForm();

    const [present] = useIonToast();

    const { incomeService, accountService } = useService();
    const { user } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoadingContext);

    const [accounts, setAccounts] = useState<AccountEntity[]>([]);

    const getAccounts = async () => {
        const data = await accountService.find({
            userId: {
                constraint: 'eq',
                value: user?.id
            }
        });

        setAccounts(data);
    }

    const newIncome = async (value: IncomeEntity) => {
        try {
            const result = await incomeService.create(value);

            if (callback !== undefined) {
                await callback({
                    transfer: result
                });
            }

            setIsLoading(false);

            present({
                message: 'Ingreso creado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            setIsLoading(false);

            present({
                message: 'Error al crear el Ingreso',
                duration: 3000,
                position: 'bottom'
            })
        }
    }


    const onSubmit = async (data: any) => {

        const amount: number = parseFloat(data.amount);

        // d-m-Y
        let dateFormatted = undefined;

               
        if (data.date) {
            const [year, month, day] = data.date.toString().split('-');
            dateFormatted = `${day}-${month}-${year}`;
        }


        const income = new IncomeEntity(
            '',
            user ? user.id : '',
            data.accountId,
            data.name,
            data.note,
            amount,
            dateFormatted
        )

        setIsLoading(true);
        newIncome(income);

    }

    useEffect(() => {
        getAccounts();
    }, [])


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            Nuevo Ingreso
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
                                defaultValue={''}
                                rules={{ required: true }}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="text" />}
                            />
                        </IonItem>
                    </IonCol>

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Cuenta
                            </IonLabel>
                            <IonSelect label="Cuenta" placeholder="Selecciona una cuenta"
                                {...register("accountId", { required: true })}>

                                {
                                    accounts.map((account: any) => (
                                        <IonSelectOption key={account.id} value={account.id}>{account.name} ({account.currentAmount} $)</IonSelectOption>
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
                        <IonItem>
                            <IonLabel>
                                Nota
                            </IonLabel>
                            <Controller
                                name="note"
                                control={control}
                                defaultValue={''}
                                render={({ field: { onChange, value, onBlur } }) => <IonTextarea onIonChange={onChange} value={value} onIonBlur={onBlur} />}
                            />
                        </IonItem>
                    </IonCol>

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Fecha
                            </IonLabel>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="date" />}
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

export default IncomeForm;