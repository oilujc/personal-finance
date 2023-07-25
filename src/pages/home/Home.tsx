import React, { useContext, useEffect } from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import './Home.css';

import usePermission from '../../hooks/permissionHook';
import UserBudgetCard from '../../components/userBudgetCard/UserBudgetCard';
import { useService } from '../../hooks/serviceHook';
import UserBudgetEntity from '../../domain/entities/UserBudgetEntity';
import { AuthContext } from '../../context/authContext';
import BudgetProgressList from '../../components/BudgetProgressList';
import BudgetEntity from '../../domain/entities/BudgetEntity';
import { personCircle } from 'ionicons/icons';
import UserTrackEntity from '../../domain/entities/UserTrackEntity';
import ShortCuts from '../../components/shortCuts/ShortCuts';
import TransactionEntity from '../../domain/entities/TransactionEntity';
import RecentTransactions from '../../components/recentTransactions/RecentTransactions';


const Home: React.FC = () => {

  const [transactions, setTransactions] = React.useState<TransactionEntity[]>([]);
  const [userTrack, setUserTrack] = React.useState<UserTrackEntity | null>(null);

  const { user } = useContext(AuthContext);
  const { userBudgetService, transactionService } = useService();


  const getUserBudget = async () => {
    if (user) {
      const userBudget = await userBudgetService.getOne({});

      setUserTrack(userBudget);
    }
  }

  const getTransactions = async () => {
    try {
      const data = await transactionService.find({});
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }

  }

  const onRefresh = async () => {
    await getUserBudget();
    await getTransactions();
  }

  useIonViewWillEnter(async () => {
     await onRefresh();
  });


  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Bienvenido, {user?.getFullName()}</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink="/profile">
             <IonIcon slot="icon-only" icon={personCircle} />
          </IonButton>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>

              {
                userTrack && (
                  <UserBudgetCard userBudget={userTrack} />
                )
              }

              <ShortCuts callback={onRefresh} />

              {
                transactions.length > 0 && (
                  <RecentTransactions transactions={transactions} />
                )
              }
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
