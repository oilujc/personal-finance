import React, { useContext, useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonNote, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { AuthContext } from '../../context/authContext';
import { useService } from '../../hooks/serviceHook';
import LoanEntity from '../../domain/entities/LoanEntity';
import LoanForm from '../../components/loanForm/LoanForm';
import { add, checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface GetLoansArgs {
    limit: number;
    offset: number;
}


const Loans: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { loanService } = useService();

    const [loans, setLoans] = useState<LoanEntity[]>([]);

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [onOpenModal, setOnOpenModal] = useState(false);
    const history = useHistory();

    const modal = React.useRef<HTMLIonModalElement>(null);

    const getLoans = async (args: GetLoansArgs) => {
        
        
        const data = await loanService.find({
            userId: user?.id,
            limit: args.limit,
            offset: args.offset
        });

        setLoans(data);

        setLimit(args.limit + 20);
        setOffset(args.offset + 20);
    }

    const getDateFormat = (date: Date | undefined) => {

        if (!date) {
            return '';
        }
    
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const getLoanType = (type: string | undefined) => {
        if (!type) {
            return '';
        }

        if (!LoanEntity.LOAN_TYPES[type]) {
            return '';
        }

        return LoanEntity.LOAN_TYPES[type];
    }


    const isPaid = (item: LoanEntity) => {

        if (!item.status) {
            return false;
        }

        if (!LoanEntity.STATUS_CODE[item.status]) {
            return false;
        }

        console.log(LoanEntity.STATUS_CODE[item.status] === LoanEntity.STATUS_CODE.paid);

        return LoanEntity.STATUS_CODE[item.status] === LoanEntity.STATUS_CODE.paid;
    }

    const onSave = async (data?: any) => {
        await getLoans({ limit: 20, offset: 0 });

        setOnOpenModal(false);
    }

    const goTo = (id: string) => {
        history.push(`/loans/${id}`);
    }

    useIonViewWillEnter(async () => {
        await getLoans({ limit: 20, offset: 0 });
    });
    


    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/tabs/home' />
                    </IonButtons>
                    <IonTitle>Prestamos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Prestamos</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {loans.map((item, index) => (
                        <IonItem key={item.id} onClick={() => { goTo(item.id) }}>
                            <IonLabel>
                                <h2 style={{ marginBottom: '0px' }}>{item.name} { isPaid(item) ?? <IonIcon icon={checkmarkCircleOutline} />}</h2>
                                <p style={{ fontSize: '0.67rem' }}>
                                    {getDateFormat(item.createdAt)} / <span>{getLoanType(item.loanType)}</span>
                                </p>
                                <p>
                                    {item.note}
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
                        getLoans({ limit, offset });
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

                       <LoanForm 
                            callback={onSave}
                        />
                </IonModal>


            </IonContent>
        </IonPage>
    );
};

export default Loans;