import React, { useContext } from 'react';

import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';

import { home, trendingUpOutline, podiumOutline, walletOutline, trendingDownOutline } from 'ionicons/icons';

import Home from '../pages/home/Home';
import Budget from '../pages/budget/Budget';
import { AuthContext } from '../context/authContext';
import Accounts from '../pages/accounts/Accounts';
import Incomes from '../pages/incomes/Incomes';
import Expenses from '../pages/expenses/Expenses';



const BottomNavigationBar: React.FC = () => {

    const { user } = useContext(AuthContext);


    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/tabs/home"
                    render={() => {
                        return user ? <Home /> : <Redirect to="/login" />
                    }}
                />

                <Route exact path="/tabs/budget"
                    render={() => {
                        return user ? <Budget /> : <Redirect to="/login" />
                    }}
                />

                <Route exact path="/tabs/accounts"
                    render={() => {
                        return user ? <Accounts /> : <Redirect to="/login" />
                    }}
                />

                <Route exact path="/tabs/incomes"
                    render={() => {
                        return user ? <Incomes /> : <Redirect to="/login" />
                    }}
                />
                
                <Route exact path="/tabs/expenses"
                    render={() => {
                        return user ? <Expenses /> : <Redirect to="/login" />
                    }}
                />

            </IonRouterOutlet>


            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon aria-hidden="true" icon={home} />
                </IonTabButton>
                <IonTabButton tab="accounts" href="/tabs/accounts">
                    <IonIcon aria-hidden="true" icon={walletOutline} />
                </IonTabButton>
                <IonTabButton tab="incomes" href="/tabs/incomes">
                    <IonIcon aria-hidden="true" icon={trendingUpOutline} />
                </IonTabButton>
                <IonTabButton tab="expenses" href="/tabs/expenses">
                    <IonIcon aria-hidden="true" icon={trendingDownOutline} />
                </IonTabButton>
                <IonTabButton tab="budget" href="/tabs/budget">
                    <IonIcon aria-hidden="true" icon={podiumOutline} />
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}


export default BottomNavigationBar;