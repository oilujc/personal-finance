import React from 'react';
import './ShortCuts.css';
import { IonIcon, IonModal, IonRippleEffect } from '@ionic/react';
import { bagAddOutline, swapHorizontalOutline, trendingDownOutline, trendingUpOutline } from 'ionicons/icons';
import ExpenseForm from '../ExpenseForm';
import IncomeForm from '../IncomeForm';

interface ShortCutsProps {
    callback: (value: any) => Promise<void>;
}


const ShortCuts: React.FC<ShortCutsProps> = ({ callback }) => {

    const [onOpenModal, setOnOpenModal] = React.useState<boolean>(false);
    const [action, setAction] = React.useState<string>(''); // income, expense, purchase, loan
    const modal = React.useRef<HTMLIonModalElement>(null);

    const openModal = (action: string) => {
        setAction(action);
        setOnOpenModal(true);
    }

    const onSave = async (value: any) => {
        setOnOpenModal(false);
        setAction('');
        await callback(value);
    }

    return (
        <>
            <div className="shortcuts ion-padding">
                <div className="shortcuts__item">
                    <div className="shortcuts__item__icon icon__success" onClick={() => openModal('income')}>
                        <IonIcon icon={trendingUpOutline} color="light"></IonIcon>
                    </div>
                    <div className="shortcuts__item__name">
                        <span>Ingreso</span>
                    </div>
                </div>
                <div className="shortcuts__item" onClick={() => openModal('expense')}>
                    <div className="shortcuts__item__icon icon__danger">
                        <IonIcon icon={trendingDownOutline} color="light"></IonIcon>
                    </div>
                    <div className="shortcuts__item__name">
                        <span>Gasto</span>
                    </div>
                </div>
                <div className="shortcuts__item">
                    <div className="shortcuts__item__icon icon__danger">
                        <IonIcon icon={bagAddOutline} color="light"></IonIcon>
                    </div>
                    <div className="shortcuts__item__name">
                        <span>Compra</span>
                    </div>
                </div>
                <div className="shortcuts__item">
                    <div className="shortcuts__item__icon icon__danger">
                    <IonIcon icon={swapHorizontalOutline} color="light"></IonIcon>
                    </div>
                    <div className="shortcuts__item__name">
                        <span>Prestamo</span>
                    </div>
                </div>
            </div>


            
            <IonModal ref={modal}
                onDidDismiss={() => setOnOpenModal(false)}
                isOpen={onOpenModal}
                initialBreakpoint={0.70}
                breakpoints={[0, 0.70, 1]}
                handleBehavior="cycle">

                    {
                        action === 'expense' && (<ExpenseForm callback={onSave} />)
                    }

                    {
                        action === 'income' && (<IncomeForm callback={onSave} />)
                    }


                   
            </IonModal>

        </>
    )
}

export default ShortCuts;