import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, useIonAlert, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import './UserProfile.css';
import { AuthContext } from '../../context/authContext';
import { useService } from '../../hooks/serviceHook';
import { logOutOutline } from 'ionicons/icons';

const UserProfile: React.FC = () => {

  const { authService } = useService();
  const { setUser } = useContext(AuthContext);

  const [ presentAlert ] = useIonAlert();


  const onLogout = () => {
    presentAlert({
      header: 'Cerrar sesión',
      message: '¿Está seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const result = await authService.logout();

            if (result) {
              setUser(null);
            }
          }
        }
      ]
    })
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/tabs/home' />
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonList>
          <IonItem button onClick={onLogout} color='danger'>
            <IonIcon icon={logOutOutline} slot='start'></IonIcon>
            Cerrar sesión
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
