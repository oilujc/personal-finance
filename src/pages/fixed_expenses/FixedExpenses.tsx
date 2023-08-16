import React, { useContext, useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { AuthContext } from '../../context/authContext';
import { useService } from '../../hooks/serviceHook';
import FixedExpenseEntity from '../../domain/entities/FixedExpenseEntity';
import { add } from 'ionicons/icons';
import FixedExpenseForm from '../../components/fixedExpenseForm/FixedExpenseForm';
import { useHistory } from 'react-router';

interface GetFixedExpensesArgs {
    limit: number;
    offset: number;
}


const FixedExpenses: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { fixedExpenseService } = useService();

    const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseEntity[]>([]);

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [onOpenModal, setOnOpenModal] = useState(false);

    const modal = React.useRef<HTMLIonModalElement>(null);
    const history = useHistory();

    const getFixedExpenses = async (args: GetFixedExpensesArgs) => {


        const data = await fixedExpenseService.find({
            userId: user?.id,
            limit: args.limit,
            offset: args.offset
        });

        if (args.offset === 0) {
            setFixedExpenses(data);
        } else {
            setFixedExpenses([...fixedExpenses, ...data]);
        }

        if (!data) {
            return;
        }

        setLimit(args.limit + 20);
        setOffset(args.offset + 20);
    }

    const onSave = async (data?: any) => {
        await getFixedExpenses({ limit: 20, offset: 0 });

        setOnOpenModal(false);
    }


    const goTo = (id: string) => () => {
        console.log('go to', id);
        history.push(`/fixed-expenses/${id}`);
    }

    useIonViewWillEnter(async () => {
        await getFixedExpenses({ limit: 20, offset: 0 });
    });




    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/tabs/home' />
                    </IonButtons>
                    <IonTitle>Gastos fijos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Gastos fijos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {fixedExpenses.map((item, index) => (
                        <IonItem key={index} onClick={goTo(item.id)} >
                            <IonLabel>
                                <h2 style={{ marginBottom: '0px' }}>{item.name}</h2>
                                <p style={{ fontSize: '0.67rem' }}>
                                    Fecha de pago: {item.date} de cada mes
                                </p>
                            </IonLabel>
                            <IonNote slot="end" color="primary">
                                <IonText><h3 style={{ margin: 0 }}>{item.amount} $</h3></IonText>
                            </IonNote>
                        </IonItem>
                    ))}
                </IonList>
                <IonInfiniteScroll
                    onIonInfinite={(ev) => {
                        getFixedExpenses({ limit, offset });
                        setTimeout(() => ev.target.complete(), 500);
                    }}
                >
                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll>

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

                    <FixedExpenseForm callback={onSave} defaultValue={null} />
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default FixedExpenses;