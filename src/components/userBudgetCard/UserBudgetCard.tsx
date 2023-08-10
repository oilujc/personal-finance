import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonModal, IonRippleEffect, useIonViewDidLeave } from '@ionic/react';
import React, { useEffect, useRef } from 'react';

import './UserBudgetCard.css';

import UserBudgetForm from '../UserBudgetForm';
import { barChart, pencil, pieChart, wallet, walletOutline } from 'ionicons/icons';
import UserTrackEntity from '../../domain/entities/UserTrackEntity';
import { useHistory } from 'react-router';


interface UserBudgetCardProps {
    userBudget: UserTrackEntity;
    title?: string;
}


const UserBudgetCard: React.FC<UserBudgetCardProps> = ({ userBudget, title }) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
    const history = useHistory();

    const onEdit = () => {
        setIsOpenModal(true);
    }

    const onSave = async (value: any) => {

        setIsOpenModal(false);
    }

    const getCurrentAmountColor = (): string => {

        if (userBudget.budgetMonthMax && userBudget.currentAmount < userBudget.budgetMonthMax) {
            return 'danger';
        }

        return 'success';
    }

    const getTitle = (): string => {
        if (userBudget.budgetMonthMax) {
            return `${userBudget.currentAmount} / ${userBudget.budgetMonthMax} $`;
        }

        return `${userBudget.currentAmount} $`;
    }

    const goTo = (path: string) => {
        return () => {
            history.push(path);
        }
    }

    return (
        <>
            <IonCard className='user-budget-card'>
                <IonCardContent className="ion-no-padding ion-padding-top ion-padding-bottom">
                    <IonButton onClick={goTo('/tabs/accounts')} fill="clear" >
                        <IonIcon slot="icon-only" icon={wallet} color="light" />
                    </IonButton>
                    <div className="ion-activatable ripple-parent rectangle" onClick={onEdit}>
                        <IonCardSubtitle color="light">
                            {title ? title : 'Presupuesto mensual '}
                        </IonCardSubtitle>
                        <IonCardTitle color={getCurrentAmountColor()}>
                            {
                                getTitle()
                            }
                        </IonCardTitle>
                        <div className="user-budget-card__transactions__resume">
                            <div className="user-budget-card__transactions__item">
                                <span className='transactions__item-title'>{userBudget.totalIncome} $</span>
                                <span className='transactions__item-subtitle'>Ingresos</span>
                            </div>
                            <div className="user-budget-card__transactions__item">
                                <span className='transactions__item-title'>{userBudget.totalExpense} $</span>
                                <span className='transactions__item-subtitle'>Gastos</span>
                            </div>
                        </div>
                        <IonRippleEffect>
                        </IonRippleEffect>
                    </div>
                    <IonButton onClick={goTo('/tabs/accounts')} fill="clear" >
                        <IonIcon slot="icon-only" icon={barChart} color="light" />
                    </IonButton>
                </IonCardContent>
            </IonCard>

            <IonModal
                ref={modal}
                isOpen={isOpenModal}
                onDidDismiss={() => setIsOpenModal(false)}
                initialBreakpoint={0.50}
                breakpoints={[0, 0.50]}
                handleBehavior="cycle">
                <UserBudgetForm defaultValue={userBudget} callback={onSave} />
            </IonModal>
        </>
    );
}

export default UserBudgetCard;