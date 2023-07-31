import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from '../../context/authContext';
import { useService } from '../../hooks/serviceHook';

import './Events.css';
import EventForm from '../../components/EventForm';
import EventEntity from '../../domain/entities/EventEntity';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Events: React.FC = () => {

    const [events, setEvents] = useState<any[]>([]);
    const [value, setValue] = useState<Value>(new Date());
    const [event, setEvent] = useState<EventEntity | null>(null);

    const { user } = useContext(AuthContext);
    const { eventService } = useService();


    const modal = useRef<HTMLIonModalElement>(null);
    const [onOpenModal, setOnOpenModal] = useState<boolean>(false);

    const getEvents = async () => {
        const res = await eventService.find({
            userId: user?.id,
        });

        console.log(res);


        setEvents(res);
    }

    const openModal = (event: EventEntity | null = null) => {
        if (event) {
            setEvent(event);
        }

        setOnOpenModal(true);
    }

    const onSave = async (data: any) => {
        console.log(data);
     
        setOnOpenModal(false);
        await getEvents();
    }

    useIonViewWillEnter(async () => {
        await getEvents();
    });



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/tabs/home' />
                    </IonButtons>
                    <IonTitle>Calendario</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Calendario</IonTitle>
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
                            Eventos este mes
                            <IonNote slot="end" color="primary" onClick={() => openModal()}>
                                <span style={{ margin: 0 }}>+ Agregar</span>
                            </IonNote>
                        </IonLabel>

                    </IonListHeader>
                    {
                        events.map((item, index) => (
                            <IonItem key={index}>
                                <IonLabel className='ion-text-wrap'>{item.name}</IonLabel>
                                <IonNote slot="end" color="primary">
                                    <IonText>
                                        <h3 style={{ margin: 0 }}>{item.amount} $</h3>
                                    </IonText>
                                </IonNote>
                            </IonItem>
                        ))
                    }
                </IonList>

                <IonModal ref={modal}
                    onDidDismiss={() => setOnOpenModal(false)}
                    isOpen={onOpenModal}
                    initialBreakpoint={0.70}
                    breakpoints={[0, 0.70]}
                    handleBehavior="cycle">

                    <EventForm defaultValue={event} callback={onSave} />

                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default Events;
