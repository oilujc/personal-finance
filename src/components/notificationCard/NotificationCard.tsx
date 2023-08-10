import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonModal, IonRippleEffect, useIonViewDidLeave } from '@ionic/react';
import React, { useEffect, useRef } from 'react';

import './NotificationCard.css';
import { useHistory } from 'react-router';

interface NotificationCardProps {
    title?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title }) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
    const history = useHistory();

 

    return (
        <>
            <IonCard className='pending-loan-card'>
                <IonCardContent className="ion-no-padding ion-padding-top ion-padding-bottom">
                    {title}
                </IonCardContent>
            </IonCard>
        </>
    );
}

export default NotificationCard;