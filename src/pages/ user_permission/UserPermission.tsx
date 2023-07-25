import React, { useRef, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { useService } from '../../hooks/serviceHook';
import UserPermissionEntity from '../../domain/entities/UserPermissionEntity';
import { add, search } from 'ionicons/icons';
import UserEntity from '../../domain/entities/UserEntity';
import UserSearchForm from '../../components/UserSearchForm';
import PermissionEntity from '../../domain/entities/PermissionEntity';
import { Controller } from 'react-hook-form';
import UserPermissionForm from '../../components/UserPermissionForm';


const UserPermission: React.FC = () => {

    const [onOpenModal, setOnOpenModal] = useState(false);
        
    const [user, setUser] = useState<UserEntity | null>(null);

    const modal = useRef<HTMLIonModalElement>(null);

    const onSearch = async (value: UserEntity) => {
        
        setOnOpenModal(false);
        setUser(value);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/tabs/profile' />

                    </IonButtons>

                    <IonTitle>{user ? `${user.firstName} ${user.lastName}` : 'Permisos de usuario'}</IonTitle>

                    <IonButtons slot='end'>
                        <IonButton onClick={() => setOnOpenModal(true)}>
                            <IonIcon icon={search} slot='icon-only' ></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{user ? `${user.firstName} ${user.lastName}` : 'Permisos de usuario'}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            { user && (
                                <UserPermissionForm defaultValue={user} />
                            )}
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
                    initialBreakpoint={0.50}
                    breakpoints={[0, 0.50]}
                    handleBehavior="cycle">

                    <UserSearchForm
                        callback={onSearch}
                    />

                </IonModal>



            </IonContent>
        </IonPage>
    );
};

export default UserPermission;
