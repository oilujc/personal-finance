import React, { useEffect } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonPopover, useIonToast } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import GroupEntity from '../../domain/entities/GroupEntity';
import { useService } from '../../hooks/serviceHook';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { on } from 'events';
import GroupForm from '../../components/GroupForm';

// import { AuthContext } from '../../context/authContext';

interface GroupDetailProps {
    id: string;
    onGroupDelete?: () => Promise<void>;
    onGroupUpdate?: () => Promise<void>;
}

const GroupMenuPopover: React.FC<GroupDetailProps> = ({ id, onGroupDelete, onGroupUpdate }) => {
    
    const { groupService } = useService();

    const [present] = useIonToast();
    const [presentAlert, dismissAlert] = useIonAlert();


    const onEdit = async () => {
        onGroupUpdate && await onGroupUpdate();
    }

    const onDelete = async () => {
        presentAlert({
            header: 'Eliminar grupo',
            message: '¿Está seguro de eliminar el grupo?',
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
                        try {
                            await groupService.delete(id);
                            
                            present({
                                message: 'Grupo eliminado',
                                duration: 2000,
                                color: 'success'
                            });
                            
                            onGroupDelete && await onGroupDelete();                            


                        } catch (error) {
                            console.log('Error', error);
                            present({
                                message: 'Error al eliminar el grupo',
                                duration: 2000,
                                color: 'danger'
                            });
                        }
                    }
                }
            ]
        })

    
    }





    return (
        <IonList>
            <IonItem button onClick={onEdit}>
                Editar
            </IonItem>
            <IonItem button onClick={onDelete} color='danger'>
                Eliminar
            </IonItem>
        </IonList>
    );
}



const GroupDetail: React.FC = () => {



    // Get id from url
    const { id } = useParams<{ id: string }>();
    const router = useHistory();

    const { groupService } = useService();

    const [group, setGroup] = React.useState<GroupEntity | null>(null);
    const [present] = useIonToast();

    const modal = React.useRef<HTMLIonModalElement>(null);
    const [onOpenModal, setOnOpenModal] = React.useState(false);

    const [presentPopover, dismissPopover] = useIonPopover(GroupMenuPopover, {
        id,
        onGroupDelete: async () => {
            dismissPopover();
            router.goBack();
        },
        onGroupUpdate: async () => {
            dismissPopover();

            setOnOpenModal(true);
        },
        onHide: () => dismissPopover()
    });

    const fetchData = async () => {
        try {
            const group = await groupService.getById(id);
            
            setGroup(group);

        } catch (error) {
            console.log('Error', error);

            present({
                message: 'Error al obtener el grupo',
                duration: 2000,
                color: 'danger'
            });
        }
    }

    const onFormSubmit = async () => {
        setOnOpenModal(false);

        await fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [id]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/home" />
                    </IonButtons>

                    <IonTitle>{group ? group.name : ''}</IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={(e) => presentPopover({ event: e.nativeEvent })}>
                            <IonIcon slot="icon-only" icon={ellipsisVerticalOutline} />
                        </IonButton>

                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{group ? group.name : ''}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonModal ref={modal}
                    onDidDismiss={() => setOnOpenModal(false)}
                    isOpen={onOpenModal}
                    initialBreakpoint={0.50}
                    breakpoints={[0, 0.50]}
                    handleBehavior="cycle">

                    <GroupForm callback={onFormSubmit} defaultValue={group} />



            </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default GroupDetail;
