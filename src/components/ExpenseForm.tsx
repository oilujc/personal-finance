import { IonButton, IonCheckbox, IonCol, IonDatetime, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, useIonToast } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountEntity from "../domain/entities/AccountEntity";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { useService } from "../hooks/serviceHook";
import ExpenseEntity from "../domain/entities/ExpenseEntity";
import BudgetEntity from "../domain/entities/BudgetEntity";


interface ExpenseFormProps {
    callback?: (data?: any) => Promise<void>;
    defaultValue?: ExpenseEntity | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ callback, defaultValue }) => {

    const {
        control,
        handleSubmit,
        register,
    } = useForm();

    const [present] = useIonToast();

    const { expenseService, accountService, budgetService } = useService();
    const { user } = useContext(AuthContext);

    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [budgets, setBudgets] = useState<BudgetEntity[]>([]);

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


    const newExpense = async (value: ExpenseEntity) => {
        try {
            const result = await expenseService.create(value);

            if (callback !== undefined) {
                await callback({
                    transfer: result
                });
            }

            present({
                message: 'Gasto creado correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            present({
                message: 'Error al crear el Gasto',
                duration: 1000,
                position: 'bottom'
            })
        }
    }


    const onSubmit = async (data: any) => {

        const amount: number = parseFloat(data.amount);
        const account: AccountEntity = data.account;
        let dateFormatted: string | undefined = undefined;

        if (account.currentAmount < amount) {
            present({
                message: 'El monto de el Gasto es mayor al saldo de la cuenta',
                duration: 1000,
                position: 'bottom'
            })
            return;
        }


        if (data.date) {
            console.log(data.date);

            const [year, month, day] = data.date.toString().split('-');
            dateFormatted = `${day}-${month}-${year}`;
        }


        const expense = new ExpenseEntity(
            '',
            user ? user.id : '',
            account.id,
            data.categoryId,
            data.name,
            data.note,
            amount,
            dateFormatted
        );

        if (defaultValue) {
            expense.fixedExpenseId = defaultValue.fixedExpenseId;
        }

        newExpense(expense);

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
                            Nuevo Gasto
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

export default ExpenseForm;