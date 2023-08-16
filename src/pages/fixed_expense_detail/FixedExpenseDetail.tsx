import React, { useContext, useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPage, IonSpinner, IonText, IonTitle, IonToolbar, useIonAlert, useIonPopover, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { useService } from '../../hooks/serviceHook';
import { useHistory, useParams } from 'react-router';

import FixedExpenseEntity from '../../domain/entities/FixedExpenseEntity';
import dateFormatter from '../../utils/dateFormatter';
import FixedExpenseForm from '../../components/fixedExpenseForm/FixedExpenseForm';
import ExpenseForm from '../../components/ExpenseForm';
import { add, ellipsisVerticalOutline } from 'ionicons/icons';
import ExpenseEntity from '../../domain/entities/ExpenseEntity';

interface FixedExpenseMenuProps {
    id: string;
    onFixedExpenseDelete?: () => void;
    onFixedExpenseUpdate?: () => void;
}

const FixedExpenseMenuPopover: React.FC<FixedExpenseMenuProps> = ({ id, onFixedExpenseDelete, onFixedExpenseUpdate }) => {

    const { fixedExpenseService } = useService();

    const [present] = useIonToast();
    const [presentAlert, dismissAlert] = useIonAlert();


    const onEdit = async () => {
        onFixedExpenseUpdate && await onFixedExpenseUpdate();
    }

    const onDelete = async () => {
        await presentAlert({
            header: 'Eliminar',
            message: '¿Está seguro de eliminar este Gasto Fijo?',
            buttons: [
                'Cancelar',
                {
                    text: 'Eliminar',
                    handler: async () => {

                        try {

                            await fixedExpenseService.delete(id);

                            present({
                                message: 'Gasto Fijo eliminado correctamente',
                                duration: 3000,
                                position: 'bottom'
                            })

                            onFixedExpenseDelete && await onFixedExpenseDelete();

                        } catch (error) {
                            console.log(error);

                            present({
                                message: 'Error al eliminar el Gasto Fijo',
                                duration: 3000,
                                position: 'bottom'
                            })
                        }

                    }
                }
            ]
        });
    }


    return (
        <IonList>
            <IonItem button onClick={onEdit}>
                Editar
            </IonItem>
            <IonItem button onClick={onDelete} color='danger'>
                Eliminar
            </IonItem>
        </IonList>
    );
}


const FixedExpenseDetail: React.FC = () => {

    const { fixedExpenseService } = useService();

    const { id } = useParams<{ id: string }>();
    const [fixedExpense, setFixedExpense] = useState<FixedExpenseEntity | null>(null);
    const [expense, setExpense] = useState<ExpenseEntity | null>(null);

    const [present] = useIonToast();

    const [onOpenModal, setOnOpenModal] = useState<boolean>(false);
    const modal = React.useRef<HTMLIonModalElement>(null);
    const history = useHistory();

    const [action, setAction] = useState<string>('edit'); // edit, add_expense

    const [presentPopover, dismissPopover] = useIonPopover(FixedExpenseMenuPopover, {
        id,
        onFixedExpenseDelete: async () => {
            dismissPopover();
            history.goBack();
        },
        onFixedExpenseUpdate: async () => {
            dismissPopover();
            openModal('edit');
        },
        onHide: () => dismissPopover()
    });

    const onSave = async () => {
        await getFixedExpense();
        setOnOpenModal(false);
    }

    const getFixedExpense = async () => {

        try {
            const data = await fixedExpenseService.getById(id);

            if (!data) {
                throw new Error('No se encontró el Gasto Fijo');
            }

            const expenseEntity = new ExpenseEntity(
                '',
                '',
                '',
                '',
                data.name || '',
                '',
                data.amount || 0,
                '',
            );

            setFixedExpense(data);

            expenseEntity.fixedExpenseId = data.id || '';
            setExpense(expenseEntity);


        } catch (error) {
            console.log(error);
            present({
                message: 'No se encontró el Gasto Fijo',
                duration: 1000,
                position: 'bottom'
            })
        }
    }

    const getDateFormat = (item: any) => {

        if (item.date) {
            return item.date;
        }

        if (!item.createdAt) {
            return '';
        }

        return dateFormatter(item.createdAt);

    }


    const openModal = (action: string) => {
        setAction(action);
        setOnOpenModal(true);
    }

    useIonViewWillEnter(async () => {

        console.log('received id: ', id);

        await getFixedExpense();
    });


    return (
        <IonPage className='fixed-expense-detail'>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/fixed-expenses' />
                    </IonButtons>
                    <IonTitle>{fixedExpense ? fixedExpense.name : 'Undefined'}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={(e) => presentPopover({ event: e.nativeEvent })}>
                            <IonIcon slot="icon-only" icon={ellipsisVerticalOutline} />
                        </IonButton>

                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{fixedExpense ? fixedExpense.name : 'Undefined'}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonCardHeader>
                        <IonLabel>
                            <h2>{fixedExpense ? fixedExpense.name : 'Undefined'}</h2>
                        </IonLabel>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines='none'>
                            <IonItem >
                                <IonLabel>
                                    Monto
                                </IonLabel>
                                <IonNote slot="end">
                                    <IonText><h3 style={{ margin: 0 }}>{fixedExpense ? fixedExpense.amount : 0} $</h3></IonText>
                                </IonNote>
                            </IonItem>

                            <IonItem >
                                <IonLabel>
                                    Día de pago: {fixedExpense ? fixedExpense.date : 'Undefined'} de cada mes
                                </IonLabel>
                            </IonItem>

                        </IonList>
                    </IonCardContent>
                </IonCard>

                {
                    fixedExpense ? (
                        <div className="">
                            <IonList >
                                <IonListHeader>
                                    <IonLabel>
                                        <h2>Pagos</h2>
                                    </IonLabel>
                                </IonListHeader>
                                {fixedExpense.expenses?.map((item, index) => (
                                    <IonItem key={index}>
                                        <IonLabel className='ion-text-wrap'>
                                            <h2 style={{ marginBottom: '0px' }}>{item.name}</h2>
                                            <p style={{ fontSize: '0.67rem' }}>
                                                {getDateFormat(item)}
                                            </p>
                                        </IonLabel>

                                        <IonNote slot="end" color="primary">
                                            <IonText><h3 style={{ margin: 0 }}>{item.amount} $</h3></IonText>
                                        </IonNote>
                                    </IonItem>
                                ))}
                            </IonList>


                            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                <IonFabButton onClick={() => openModal('add_expense')}>
                                    <IonIcon icon={add}></IonIcon>
                                </IonFabButton>
                            </IonFab>


                            <IonModal ref={modal}
                                onDidDismiss={() => setOnOpenModal(false)}
                                isOpen={onOpenModal}
                                initialBreakpoint={0.70}
                                breakpoints={[0, 0.70, 1]}
                                handleBehavior="cycle">
                                {
                                    action === 'edit' && (
                                        <FixedExpenseForm defaultValue={fixedExpense} callback={onSave} />
                                    )
                                }

                                {
                                    action === 'add_expense' && (
                                        <ExpenseForm callback={onSave} defaultValue={expense} />
                                    )
                                }
                            </IonModal>
                        </div>
                    ) : (
                        <IonSpinner name="lines"></IonSpinner>
                    )
                }



            </IonContent>
        </IonPage>
    );
};

export default FixedExpenseDetail;