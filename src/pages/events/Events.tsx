import React, { useContext, useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Events: React.FC = () => {

    const [events, setEvents] = useState<any[]>([]);
    const [value, setValue] = useState<Value>(new Date());

    //   const { user } = useContext(AuthContext);


    //   useIonViewWillEnter(async () => {
    //   });



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/events' />
                    </IonButtons>
                    <IonTitle>Events</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Events</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <Calendar onChange={setValue} value={value} />
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonList className='event-list' >
                    <IonListHeader>
                        <IonLabel>
                            Eventos del día
                        </IonLabel>
                    </IonListHeader>
                    {
                        transactions.map((item, index) => (
                            <IonItem key={index}>
                                <IonLabel className='ion-text-wrap
                        '>{getName(item)}</IonLabel>
                                <IonNote slot="end" color="primary">
                                    <IonText>
                                        {
                                            item.type === 'transfer' && item.item && 'amountReceived' in item.item && item.item?.amountReceived !== null && (
                                                <p>
                                                    {item.item?.amount} $
                                                </p>
                                            )
                                        }
                                        <h3 style={{ margin: 0 }}>{getAmount(item)} $</h3>
                                    </IonText>
                                </IonNote>
                            </IonItem>
                        ))
                    }
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default Events;
