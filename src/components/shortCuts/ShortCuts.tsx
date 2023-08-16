import React from 'react';
import './ShortCuts.css';
import { IonIcon, IonModal, IonRippleEffect } from '@ionic/react';
import { bagAddOutline, swapHorizontalOutline, trendingDownOutline, trendingUpOutline } from 'ionicons/icons';
import ExpenseForm from '../ExpenseForm';
import IncomeForm from '../IncomeForm';
import { useHistory } from 'react-router';

interface ShortCutsProps {
    callback: (value: any) => Promise<void>;
}


const ShortCuts: React.FC<ShortCutsProps> = ({ callback }) => {

    const history = useHistory();

    const goTo = (path: string) => {
        history.push(path);
    }

    return (
        <>
            <div className="shortcuts ion-padding">
                <div className="shortcuts__row">
                    <div className="shortcuts__item">
                        <div className="shortcuts__item__icon icon__tertiary" onClick={() => goTo('/tabs/incomes')}>
                            <IonIcon icon={trendingUpOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name">
                            <span>Ingresos</span>
                        </div>
                    </div>
                    <div className="shortcuts__item" onClick={() => goTo('/tabs/expenses')}>
                        <div className="shortcuts__item__icon icon__tertiary">
                            <IonIcon icon={trendingDownOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name">
                            <span>Gastos</span>
                        </div>
                    </div>
                    <div className="shortcuts__item" onClick={() => goTo('/loans')}>
                        <div className="shortcuts__item__icon icon__tertiary">
                            <IonIcon icon={swapHorizontalOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name">
                            <span>Prestamos</span>
                        </div>
                    </div>
                    <div className="shortcuts__item">
                        <div className="shortcuts__item__icon icon__tertiary">
                            <IonIcon icon={bagAddOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name">
                            <span>Compras</span>
                        </div>
                    </div>
                </div>
                <div className="shortcuts__row">
                    <div className="shortcuts__item">
                        <div className="shortcuts__item__icon icon__tertiary" onClick={() => goTo('/tabs/incomes')}>
                            <IonIcon icon={trendingUpOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name">
                            <span>Ingresos</span>
                            <span>fijos</span>
                        </div>
                    </div>
                    <div className="shortcuts__item" onClick={() => goTo('/fixed-expenses')}>
                        <div className="shortcuts__item__icon icon__tertiary">
                            <IonIcon icon={trendingDownOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name">
                            <span>Gastos</span>
                            <span>fijos</span>
                        </div>
                    </div>
                    <div className="shortcuts__item" onClick={() => goTo('/tabs/expenses')}>
                        <div className="shortcuts__item__icon icon__tertiary">
                            <IonIcon icon={trendingDownOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name" style={{fontSize: '.8rem'}}>
                            <span>Presupuestos</span>
                        </div>
                    </div>
                    <div className="shortcuts__item" onClick={() => goTo('/tabs/expenses')}>
                        <div className="shortcuts__item__icon icon__tertiary">
                            <IonIcon icon={trendingDownOutline} color="light"></IonIcon>
                        </div>
                        <div className="shortcuts__item__name" style={{fontSize: '.8rem'}}>
                            <span>Transacciones</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortCuts;