import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonLoading,
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


import { AuthContext } from './context/authContext';
import { LoadingContext } from './context/loadingContext';


import { useAuthInit } from './hooks/authInitHook';

import BottomNavigationBar from './components/BottomNavigationBar';
import GroupDetail from './pages/group_detail/GroupDetail';

import { GroupContext } from './context/groupContext';
import GroupEntity from './domain/entities/GroupEntity';

import { useService } from './hooks/serviceHook';
import PermissionList from './pages/permission/PermissionList';
import UserPermission from './pages/ user_permission/UserPermission';
import Signup from './pages/signup/Signup';
import UserEntity from './domain/entities/UserEntity';
import PermissionEntity from './domain/entities/PermissionEntity';
import UserProfile from './pages/user_profile/UserProfile';

setupIonicReact();

const App: React.FC = () => {

  const { authService } = useService();
  const { currentUser, loading, userPermissions  } = useAuthInit(authService);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserEntity | null>(null);
  const [group, setGroup] = useState<GroupEntity | null>(null);
  const [permissions, setPermissions] = useState<PermissionEntity[]>([]);

  const [dismiss] = useIonLoading();


  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);


  return (
    <IonApp>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <AuthContext.Provider value={{ user, setUser, permissions, setPermissions }}>
          <GroupContext.Provider value={{ group, setGroup }}>
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
                    return user ? <GroupDetail /> : <Login />
                  }}
                />

                <Route exact path="/permission"
                  render={() => {
                    return user ? <PermissionList /> : <Login />
                  }}
                />

                <Route exact path="/user-permission"
                  render={() => {
                    return user ? <UserPermission /> : <Login />
                  }}
                />


                <Route exact path="/profile"
                    render={() => {
                        return user ? <UserProfile /> : <Login />
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
          </GroupContext.Provider>
        </AuthContext.Provider>
      </LoadingContext.Provider>

      {
        isLoading && <IonLoading
          isOpen={isLoading}
          onDidDismiss={() => dismiss()}
          message={'Cargando...'}
          duration={5000}
        />
      }

    </IonApp>
  )
};

export default App;
