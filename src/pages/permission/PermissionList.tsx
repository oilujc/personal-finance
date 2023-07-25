import React, { useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { useService } from '../../hooks/serviceHook';
import PermissionEntity from '../../domain/entities/PermissionEntity';
import { add, checkmarkCircleOutline } from 'ionicons/icons';
import PermissionForm from '../../components/PermissionForm';


const PermissionList: React.FC = () => {

  const { permissionService } = useService();

  const [permissions, setPermissions] = useState<PermissionEntity[]>([]);
  const [onOpenModal, setOnOpenModal] = useState(false);

  const [permission, setPermission] = useState<PermissionEntity | null>(null);

  const [present] = useIonToast();

  const [presentAlert] = useIonAlert();

  const modal = useRef<HTMLIonModalElement>(null);

  const getPermissions = async () => {
    const permissions = await permissionService.find({});

    setPermissions(permissions);
  }

  const onSave = async () => {
    await getPermissions();

    setPermission(null);
    setOnOpenModal(false);
  }

  const onDelete = async (id: string) => {
    await presentAlert({
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el permiso?',
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          handler: async () => {

            try {

              await permissionService.delete(id);

              await getPermissions();

              present({
                message: 'Permiso eliminado correctamente',
                duration: 3000,
                position: 'bottom'
              })

            } catch (error) {
              console.log(error);

              present({
                message: 'Error al eliminar el permiso',
                duration: 3000,
                position: 'bottom'
              })
            }

          }
        }
      ]});
  }

  const onEdit = async (item: PermissionEntity) => {
    setPermission(item);
    setOnOpenModal(true);
  }

  useIonViewWillEnter(() => {
    getPermissions();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/tabs/profile' />

          </IonButtons>

          <IonTitle>Permisos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Permisos</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                {permissions.map((permission, index) => (
                  <IonItemSliding key={index}>
                    <IonItem >
                      <IonLabel>
                        {permission.key}
                      </IonLabel>
                      {
                        permission.isDefault &&  <IonIcon slot='end' icon={checkmarkCircleOutline} />
                      }
                     
                    </IonItem>
                    <IonItemOptions>
                      <IonItemOption color="primary" expandable 
                        onClick={() => {onEdit(permission)}} >Edit</IonItemOption>
                      <IonItemOption color="danger" expandable
                       onClick={() => onDelete(permission.id)} >Delete</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                ))}
              </IonList>
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

          <PermissionForm
            callback={onSave}
            defaultValue={permission}
          />



        </IonModal>



      </IonContent>
    </IonPage>
  );
};

export default PermissionList;
