import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  useIonLoading,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import Login from './pages/login/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

import { SplashScreen } from '@capacitor/splash-screen';

import { AuthContext } from './context/authContext';


import { useAuthInit } from './hooks/authInitHook';

import BottomNavigationBar from './components/BottomNavigationBar';
import GroupDetail from './pages/group_detail/GroupDetail';

import { useService } from './hooks/serviceHook';
import Signup from './pages/signup/Signup';
import UserEntity from './domain/entities/UserEntity';
import PermissionEntity from './domain/entities/PermissionEntity';
import UserProfile from './pages/user_profile/UserProfile';
import { LoadingContext } from './context/loadingContext';
import Loans from './pages/loans/Loans';
import LoanDetail from './pages/loan_detail/LoanDetail';

setupIonicReact();

const App: React.FC = () => {

  const [user, setUser] = useState<UserEntity | null>(null);
  const [permissions, setPermissions] = useState<PermissionEntity[]>([]);

  const { authService } = useService();
  const { currentUser, userPermissions, isLoading } = useAuthInit(authService);

  useEffect(() => {
    SplashScreen.show({
      autoHide: false
    })
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  return (
    <IonApp>
      <AuthContext.Provider value={{ user, setUser, permissions, setPermissions }}>
        <IonReactRouter>
          <IonRouterOutlet>

            <Route exact path="/login"
              render={() => {
                return user ? <Redirect to="/tabs/home" /> : <Login />
              }}
            />

            <Route exact path="/signup"
              render={() => {
                return user ? <Redirect to="/tabs/home" /> : <Signup />
              }}
            />

            <Route exact path="/group/:id"
              render={() => {
                return user ? <GroupDetail /> : <Redirect to="/login" />
              }}
            />

            <Route exact path="/profile"
              render={() => {
                return user ? <UserProfile /> : <Redirect to="/login" />
              }}
            />

            <Route exact path="/loans"
              render={() => {
                return user ? <Loans /> : <Redirect to="/login" />
              }}
            />

            <Route exact path="/loans/:id"
              render={() => {
                return user ? <LoanDetail /> : <Redirect to="/login" />
              }}
            />

            <Route path="/tabs"
              render={() => {
                return user ? <BottomNavigationBar /> : <Redirect to="/login" />
              }}
            />

            <Route exact path="/">
              <Redirect to="/tabs/home" />
            </Route>

          </IonRouterOutlet>


        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  )
};

export default App;
