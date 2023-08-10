import React, { useContext, useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPage, IonSpinner, IonText, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { useService } from '../../hooks/serviceHook';
import LoanEntity from '../../domain/entities/LoanEntity';
import { useParams } from 'react-router';
import dateFormatter from '../../utils/dateFormatter';

import './LoanDetail.css';
import LoanPayForm from '../../components/loanPayForm/LoanPayForm';
import { add } from 'ionicons/icons';

const LoanDetail: React.FC = () => {

    const { loanService } = useService();

    const { id } = useParams<{ id: string }>();
    const [loan, setLoan] = useState<LoanEntity | null>(null);
    const [present] = useIonToast();

    const [onOpenModal, setOnOpenModal] = useState<boolean>(false);
    const modal = React.useRef<HTMLIonModalElement>(null);

    const onSave = async () => {
        await getLoan();
        setOnOpenModal(false);
    }

    const getLoan = async () => {
        const data = await loanService.getById(id);

        if (!data) {
            present({
                message: 'No se encontró el prestamo',
                duration: 1000,
                position: 'bottom'
            })
            return;
        }

        setLoan(data);
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

    const getLoanType = (type: string | undefined) => {
        if (!type) {
            return '';
        }

        switch (type) {
            case 'expense':
                return 'Gasto';
            case 'income':
                return 'Ingreso';
            default:
                return '';
        }
    }

    const getStatus = (status: string | undefined) => {
        if (!status) {
            return '';
        }

        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'paid':
                return 'Pagado';
            case 'cancelled':
                return 'Cancelado';
            default:
                return '';
        }
    }


    useIonViewWillEnter(async () => {
        await getLoan();
    });


    return (
        <IonPage className='loan-detail'>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/loans' />
                    </IonButtons>
                    <IonTitle>{loan ? loan.name : 'Undefined'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{loan ? loan.name : 'Undefined'}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonCardHeader>
                        <IonLabel>
                            <h2>{loan ? loan.name : 'Undefined'}</h2>
                        </IonLabel>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines='none'>
                            <IonItem >
                                <IonLabel>
                                    Monto
                                </IonLabel>
                                <IonNote slot="end">
                                    <IonText><h3 style={{ margin: 0 }}>{loan ? loan.amount : 0} $</h3></IonText>
                                </IonNote>
                            </IonItem>
                            <IonItem >
                                <IonLabel>
                                    Tipo
                                </IonLabel>
                                <IonNote slot="end">
                                    <IonText><h3 style={{ margin: 0 }}>{loan ? getLoanType(loan.loanType) : ''}</h3></IonText>
                                </IonNote>
                            </IonItem>
                            <IonItem >
                                <IonLabel>
                                    Estado
                                </IonLabel>
                                <IonNote slot="end">
                                    <IonText><h3 style={{ margin: 0 }}>{loan ? getStatus(loan.status) : ''}</h3></IonText>
                                </IonNote>
                            </IonItem>
                            <IonItem >
                                <IonLabel>
                                    Nota
                                    <p>{loan?.note}</p>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                {
                    loan ? (
                        <div className="">
                            <IonList >
                                <IonListHeader>
                                    <IonLabel>
                                        <h2>Ingresos</h2>
                                    </IonLabel>
                                </IonListHeader>
                                {loan.incomes?.map((item, index) => (
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
                            <IonList >
                                <IonListHeader>
                                    <IonLabel>
                                        <h2>Gastos</h2>
                                    </IonLabel>
                                </IonListHeader>
                                {loan.expenses?.map((item, index) => (
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

                            {
                                loan.status === 'pending' && (
                                    <div className="">
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

                                            <LoanPayForm
                                                defaultValue={loan} callback={onSave}
                                            />
                                        </IonModal>
                                    </div>
                                )
                            }



                        </div>
                    ) : (
                        <IonSpinner name="lines"></IonSpinner>
                    )
                }



            </IonContent>
        </IonPage>
    );
};

export default LoanDetail;