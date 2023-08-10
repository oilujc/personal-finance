import React, { useContext, useRef, useState } from 'react';
import { IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useService } from '../../hooks/serviceHook';
import { AuthContext } from '../../context/authContext';
import IncomeEntity from '../../domain/entities/IncomeEntity';
import IncomeForm from '../../components/IncomeForm';
import dateFormatter from '../../utils/dateFormatter';


const Incomes: React.FC = () => {

    const { incomeService } = useService();
    const { user } = useContext(AuthContext);

    const [incomes, setIncomes] = useState<IncomeEntity[]>([]);

    const [onOpenModal, setOnOpenModal] = useState(false);

    const modal = useRef<HTMLIonModalElement>(null);

    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();

    const getIncomes = async () => {
        const data = await incomeService.find({
            userId: {
                constraint: 'eq',
                value: user?.id
            }
        });

        setIncomes(data);
    }

    const onSave = async (data?: any) => {
        await getIncomes();

        setOnOpenModal(false);
    }

    const onDelete = async (id: string) => {
        await presentAlert({
            header: 'Eliminar',
            message: '¿Está seguro de eliminar este ingreso?',
            buttons: [
                'Cancelar',
                {
                    text: 'Eliminar',
                    handler: async () => {

                        try {

                            await incomeService.delete(id);

                            await getIncomes();

                            present({
                                message: 'Ingreso eliminado correctamente',
                                duration: 1000,
                                position: 'bottom'
                            })

                        } catch (error) {
                            console.log(error);

                            present({
                                message: 'Error al eliminar el ingreso',
                                duration: 1000,
                                position: 'bottom'
                            })
                        }

                    }
                }
            ]
        });
    }

    const getDateFormat = (item: IncomeEntity) => {
        
        if (item.date) {
            return item.date;
        }

        if (!item.createdAt) {
            return '';
        }

        return dateFormatter(item.createdAt);

    }


    useIonViewWillEnter(() => {
        getIncomes();
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ingresos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Ingresos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                {incomes.map((item, index) => (
                                    <IonItemSliding key={index}>
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
                                            <IonItemOption color="danger" expandable
                                                onClick={() => onDelete(item.id)} >Delete</IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                ))}
                            </IonList>
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

                       <IncomeForm 
                            callback={onSave}
                        />
                </IonModal>



            </IonContent>
        </IonPage>
    );
};

export default Incomes;
