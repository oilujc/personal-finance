import { IonItem, IonLabel, IonList, IonListHeader, IonNote, IonText } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import BudgetEntity from '../domain/entities/BudgetEntity';
import { useService } from '../hooks/serviceHook';
import BudgetProgressEntity from '../domain/entities/BudgetProgressEntity';

interface BudgetProgressListProps {
    budgets: BudgetEntity[];
}

const BudgetProgressList: React.FC<BudgetProgressListProps> = ({ budgets }) => {

    const [budgetProgress, setBudgetProgress] = useState<BudgetProgressEntity[]>([]);
    const { budgetProgressService } = useService();

    const getBudgetProgress = async () => {
        budgets.forEach(async (budget) => {
            const data = await budgetProgressService.find({
                budgetId: {
                    constraint: 'eq',
                    value: budget.id
                },
                month: {
                    constraint: 'eq',
                    value: new Date().getMonth()
                },
                year: {
                    constraint: 'eq',
                    value: new Date().getFullYear()
                }
            });

            console.log('data', data)

            if (data.length <= 0) {
                return;
            }

            const progress = data[0];
            budget.setBudgetProgress = progress;

            setBudgetProgress([...budgetProgress, progress]);
        });

        console.log('budgetProgress', budgetProgress)
    }

    useEffect(() => {
        getBudgetProgress();
    }, []);

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>Presupuesto</IonLabel>
            </IonListHeader>
            {
                budgets.map((item, index) => (
                    <IonItem key={index}>
                        <IonLabel>{item.name}</IonLabel>
                        <IonNote slot="end" color="primary">
                            <IonText><h3 style={{ margin: 0 }}>{item.getBudgetProgress ? item.getBudgetProgress.currentAmount : 0} / {item.amount} </h3></IonText>
                        </IonNote>
                    </IonItem>
                ))
            }
        </IonList>
    )
}

export default BudgetProgressList;