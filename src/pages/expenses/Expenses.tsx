import React, { useContext, useRef, useState } from 'react';
import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useService } from '../../hooks/serviceHook';
import { AuthContext } from '../../context/authContext';
import ExpenseEntity from '../../domain/entities/ExpenseEntity';
import ExpenseForm from '../../components/ExpenseForm';
import dateFormatter from '../../utils/dateFormatter';

interface GetExpensesArgs {
    limit: number;
    offset: number;
}

const Expenses: React.FC = () => {

    const { expenseService } = useService();
    const { user } = useContext(AuthContext);

    const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [onOpenModal, setOnOpenModal] = useState(false);

    const modal = useRef<HTMLIonModalElement>(null);

    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();

    const getExpenses = async (args: GetExpensesArgs) => {
        const data = await expenseService.find({
            userId: user?.id,
            limit: args.limit,
            offset: args.offset
        });

        if (data.length === 0) {
            return;
        }

        if (args.offset === 0) {
            setExpenses(data);
        } else {
            setExpenses([...expenses, ...data]);
        }


        setLimit(args.limit + 20);
        setOffset(args.offset + 20);
    }

    const onSave = async (data?: any) => {
        await getExpenses({
            limit: 20,
            offset: 0
        });

        setOnOpenModal(false);
    }

    const onDelete = async (id: string) => {
        await presentAlert({
            header: 'Eliminar',
            message: '¿Está seguro de eliminar este gasto?',
            buttons: [
                'Cancelar',
                {
                    text: 'Eliminar',
                    handler: async () => {

                        try {

                            await expenseService.delete(id);

                            await getExpenses({ limit: 20, offset: 0 });

                            present({
                                message: 'Gasto eliminado correctamente',
                                duration: 1000,
                                position: 'bottom'
                            })

                        } catch (error) {
                            console.log(error);

                            present({
                                message: 'Error al eliminar el gasto',
                                duration: 1000,
                                position: 'bottom'
                            })
                        }

                    }
                }
            ]
        });
    }

    const getDateFormat = (item: ExpenseEntity) => {

        if (item.date) {
            return item.date;
        }

        if (!item.createdAt) {
            return '';
        }

        return dateFormatter(item.createdAt);

    }

    useIonViewWillEnter(() => {
        getExpenses({ limit: 20, offset: 0 });
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Gastos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Gastos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                {expenses.map((item, index) => (
                                    <IonItemSliding key={index} >
                                        <IonItem >
                                            <IonLabel className='ion-text-wrap'>
                                                <p style={{ fontSize: '0.8rem' }}>
                                                    {getDateFormat(item)}
                                                </p>
                                                <h2>{item.name}</h2>
                                                <p>
                                                    {item.note}
                                                </p>
                                            </IonLabel>

                                            <IonNote slot="end" color="primary">
                                                <IonText><h3 style={{ margin: 0 }}>{item.amount} $</h3></IonText>
                                            </IonNote>
                                        </IonItem>
                                        <IonItemOptions>
                                            <IonItemOption color="danger"
                                                onClick={() => onDelete(item.id)} >Eliminar</IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                ))}
                            </IonList>

                            {
                                <IonInfiniteScroll
                                    onIonInfinite={(ev) => {
                                        getExpenses({ limit, offset });
                                        setTimeout(() => ev.target.complete(), 500);
                                    }}
                                >
                                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                                </IonInfiniteScroll>
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>


                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => setOnOpenModal(true)}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>

                <IonModal ref={modal}
                    onDidDismiss={() => setOnOpenModal(false)}
                    isOpen={onOpenModal}
                    initialBreakpoint={0.70}
                    breakpoints={[0, 0.70, 1]}
                    handleBehavior="cycle">

                    <ExpenseForm
                        callback={onSave}
                    />
                </IonModal>



            </IonContent>
        </IonPage>
    );
};

export default Expenses;
