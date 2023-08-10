import { IonButton, IonCheckbox, IonCol, IonDatetime, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTextarea, useIonToast } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountEntity from "../../domain/entities/AccountEntity";
import { AuthContext } from "../../context/authContext";
import { useService } from "../../hooks/serviceHook";
import LoanEntity from "../../domain/entities/LoanEntity";
import BudgetEntity from "../../domain/entities/BudgetEntity";


interface LoanFormProps {
    callback?: (data?: any) => Promise<void>;
}

const LoanForm: React.FC<LoanFormProps> = ({ callback }) => {

    const {
        control,
        handleSubmit,
        register,
    } = useForm();

    const [present] = useIonToast();

    const { loanService, accountService, budgetService } = useService();
    const { user } = useContext(AuthContext);

    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [budgets, setBudgets] = useState<BudgetEntity[]>([]);
    const [loanType, setLoanType] = useState<string>('fromMe'); // toMe, fromMe

    const getAccounts = async () => {
        const data = await accountService.find({
            userId: {
                constraint: 'eq',
                value: user?.id
            }
        });

        setAccounts(data);
    }

    const getBudgets = async () => {
        const data = await budgetService.find({
            userId: {
                constraint: 'eq',
                value: user?.id
            }
        });

        setBudgets(data);

    }


    const newLoan = async (value: LoanEntity) => {
        try {
            const result = await loanService.create(value);

            if (callback !== undefined) {
                await callback({
                    transfer: result
                });
            }

            present({
                message: 'Prestamo creado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            present({
                message: 'Error al crear el prestamo',
                duration: 1000,
                position: 'bottom'
            })
        }
    }


    const onSubmit = async (data: any) => {

        const amount: number = parseFloat(data.amount);
        const account: AccountEntity = data.account;

        const fromUser = loanType === 'fromMe' ? 'me' : data.name;
        const toUser = loanType === 'fromMe' ? data.name : 'me';

        if (fromUser === 'me') {
            if (account.currentAmount < amount) {
                present({
                    message: 'No tienes suficiente dinero en la cuenta',
                    duration: 1000,
                    position: 'bottom'
                })
                return;
            }

            if (!data.categoryId) {
                present({
                    message: 'Debes seleccionar una categoria',
                    duration: 1000,
                    position: 'bottom'
                })
                return;
            }
        }

        const loan = new LoanEntity(
            '',
            user ? user.id : '',
            account.id,
            amount,
            fromUser,
            toUser,
            data.note
        )

        loan.budgetId = fromUser === 'me' ? data.categoryId : null;

        newLoan(loan);

    }

    useEffect(() => {
        getAccounts();
        getBudgets();
    }, [])


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            Nuevo Prestamo
                        </IonText>
                    </IonCol>

                    <IonCol size="12">
                        <IonSegment value={loanType}>
                            <IonSegmentButton value="fromMe" onClick={() => setLoanType('fromMe')}>
                                <IonLabel>
                                    De mi
                                </IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="toMe" onClick={() => setLoanType('toMe')}>
                                <IonLabel>
                                    Para mi
                                </IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonCol>

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                {loanType === 'fromMe' ? 'Prestamo a' : 'Prestamo de'}
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
                                {...register("account", { required: true })}>

                                {
                                    accounts.map((account: any) => (
                                        <IonSelectOption key={account.id} value={account}>{account.name} ({account.currentAmount} $)</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>
                    </IonCol>

                    {
                        loanType === 'fromMe' && (
                            <IonCol size='12'>
                                <IonItem>
                                    <IonLabel>
                                        Categoria
                                    </IonLabel>
                                    <IonSelect label="Categoria" placeholder="Selecciona una categoria"
                                        {...register("categoryId", { required: true })}>

                                        {
                                            budgets.map((item: any) => (
                                                <IonSelectOption key={item.id} value={item.id}>{item.name}</IonSelectOption>
                                            ))
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        )
                    }

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Monto
                            </IonLabel>
                            <Controller
                                name="amount"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput 
                                    onIonChange={onChange} value={value} onIonBlur={onBlur} pattern="^[0-9]+([.][0-9]{1,2})?$" inputMode="decimal" type="text" />}
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
                                defaultValue={null}
                                render={({ field: { onChange, value, onBlur } }) => <IonTextarea onIonChange={onChange} value={value} onIonBlur={onBlur} />}
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

export default LoanForm;