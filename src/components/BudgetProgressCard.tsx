import { IonItem, IonLabel, IonList } from '@ionic/react';
import React from 'react';

interface BudgetProgressCardProps {

}

const BudgetProgressCard: React.FC<BudgetProgressCardProps> = () => {
    return (
        <IonList>
            <IonItem>
            <IonLabel>Pokémon Yellow</IonLabel>
            </IonItem>
            <IonItem>
            <IonLabel>Mega Man X</IonLabel>
            </IonItem>
            <IonItem>
            <IonLabel>The Legend of Zelda</IonLabel>
            </IonItem>
            <IonItem>
            <IonLabel>Pac-Man</IonLabel>
            </IonItem>
            <IonItem>
            <IonLabel>Super Mario World</IonLabel>
            </IonItem>
      </IonList>
    )
}

export default BudgetProgressCard;