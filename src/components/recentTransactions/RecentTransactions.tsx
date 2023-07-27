import { IonItem, IonLabel, IonList, IonListHeader, IonNote, IonText } from '@ionic/react';
import React, { useState } from 'react';
import TransactionEntity from '../../domain/entities/TransactionEntity';

interface RecentTransactionsProps {
    transactions: TransactionEntity[];
}

const RecentTransactions : React.FC<RecentTransactionsProps> = ({ transactions }) => {

    const getName = (transaction: TransactionEntity) => {

        if (transaction.type === 'transfer') {
            return `Transferencia: ${transaction.item?.name}`;
        }

        return transaction.item?.name;
    }

    const getAmount = (transaction: TransactionEntity) => {
        return transaction.item?.amount;
    }

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>Transacciones recientes</IonLabel>
            </IonListHeader>
            {
                transactions.map((item, index) => (
                    <IonItem key={index}>
                        <IonLabel className='ion-text-wrap
                        '>{getName(item)}</IonLabel>
                        <IonNote slot="end" color="primary">
                            <IonText><h3 style={{ margin: 0 }}>{getAmount(item)} $</h3></IonText>
                        </IonNote>
                    </IonItem>
                ))
            }
        </IonList>
    )

}

export default RecentTransactions;