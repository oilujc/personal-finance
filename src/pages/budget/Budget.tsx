import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import './Budget.css';
import { add } from 'ionicons/icons';
import { useService } from '../../hooks/serviceHook';
import { AuthContext } from '../../context/authContext';
import BudgetEntity from '../../domain/entities/BudgetEntity';
import BudgetForm from '../../components/BudgetForm';
import ProgressBar from '../../components/progressBar/ProgressBar';

const Budget: React.FC = () => {

  const [budgets, setBudgets] = useState<BudgetEntity[]>([]);
  const [budget, setBudget] = useState<BudgetEntity | null>(null);
  const [budgetProgress, setBudgetProgress] = useState<any[]>([]); // [{budgetId: string, progress: number}

  const { user } = useContext(AuthContext);

  const { budgetService, budgetProgressService } = useService();

  const modal = useRef<HTMLIonModalElement>(null);
  const [onOpenModal, setOnOpenModal] = useState<boolean>(false);

  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  const getBudgets = async () => {
    const data = await budgetService.find({
      userId: user?.id
    });

    const progress = await budgetProgressService.find({
      budgetId__in: data.map(item => item.id)
    });

    setBudgets(data);
    setBudgetProgress(progress);
  }

  const onSave = async (data?: any) => {
    await getBudgets();

    setBudget(null);
    setOnOpenModal(false);
  }

  const onDelete = async (id: string) => {
    await presentAlert({
      header: 'Eliminar',
      message: '¿Está seguro de eliminar este presupuesto?',
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          handler: async () => {

            try {

              await budgetService.delete(id);

              await getBudgets();

              present({
                message: 'Presupuesto eliminado correctamente',
                duration: 3000,
                position: 'bottom'
              })

            } catch (error) {
              console.log(error);

              present({
                message: 'Error al eliminar el presupuesto',
                duration: 3000,
                position: 'bottom'
              })
            }

          }
        }
      ]
    });
  }

  const onEdit = async (item: BudgetEntity) => {
    setBudget(item);
    setOnOpenModal(true);
  }

  const dismissModal = () => {
    setBudget(null);
    setOnOpenModal(false);
  }

  useIonViewWillEnter(() => {
    getBudgets();
  });

  const getProgress = (budgetId: string) => {
    const progress = budgetProgress.find(progress => progress.budgetId === budgetId);

    if (!progress) return null;

    return progress?.currentProgress;
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Presupuesto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Presupuesto</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                {budgets.map((item, index) => (
                  <IonItemSliding key={index}>
                    <IonItem >
                      <IonLabel>
                        <IonText className='ion-text-wrap' >
                          {item.name}
                        </IonText>
                        {
                          (getProgress(item.id)) && (
                            <div className="budget-progress__container">
                              <span>Este mes</span>
                              <ProgressBar progress={getProgress(item.id)} />
                            </div>
                          )
                        }
                      </IonLabel>
                      <IonNote slot="end" color="primary">
                        <IonText><h3 style={{ margin: 0 }}>{item.amount} $</h3></IonText>
                      </IonNote>
                    </IonItem>
                    <IonItemOptions>
                      <IonItemOption color="primary" expandable
                        onClick={() => onEdit(item)} >Edit</IonItemOption>
                      <IonItemOption color="danger" expandable
                        onClick={() => onDelete(item.id)} >Delete</IonItemOption>
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
          onDidDismiss={() => dismissModal()}
          isOpen={onOpenModal}
          initialBreakpoint={0.50}
          breakpoints={[0, 0.50]}
          handleBehavior="cycle">

          <BudgetForm defaultValue={budget} callback={onSave} />

        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Budget;
