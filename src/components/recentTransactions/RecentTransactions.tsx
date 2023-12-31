import { IonItem, IonLabel, IonList, IonListHeader, IonNote, IonText } from '@ionic/react';
import React, { useState } from 'react';
import TransactionEntity from '../../domain/entities/TransactionEntity';

import './RecentTransactions.css';


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

    const getSubtitle = (transaction: TransactionEntity) => {

        if (transaction.type === 'transfer') {
            return `Transferencia`;
        }

        if (transaction.type === 'expense') {
            return `Gasto`;
        }

        return `Ingreso`;
    }

    const getColor = (transaction: TransactionEntity) => {
        if (transaction.type === 'transfer') {
            return `primary`;
        }

        if (transaction.type === 'expense') {
            return `danger`;
        }

        return `success`;
    }

    const getRoute = (transaction: TransactionEntity) => {
        if (transaction.type === 'transfer') {
            return `/tabs/accounts`;
        }

        if (transaction.type !== 'transfer' && transaction.item && 'loanId' in transaction.item && transaction.item?.loanId !== '') {
            return `/loans/${transaction.item?.loanId}`;
        }

        if (transaction.type === 'expense' && transaction.item && 'fixedExpenseId' in transaction.item && transaction.item?.fixedExpenseId !== null) {
            return `/fixed-expenses/${transaction.item?.fixedExpenseId}`;
        }

        if (transaction.type === 'expense') {
            return `/tabs/expenses`;
        }

        return `/tabs/incomes`;
    }


    const getAmount = (transaction: TransactionEntity) => {

        if (transaction.item === null) {
            return 0;
        }

        if (transaction.type !== 'transfer') {
            return transaction.item?.amount;
        }

        if (!('amountReceived' in transaction.item)) {
            return transaction.item?.amount;
        }

        if (transaction.item?.amountReceived === null || transaction.item?.amountReceived === undefined) {
            return transaction.item?.amount;
        }

        if (transaction.item?.amountReceived > 0) {
            return transaction.item?.amountReceived;
        }

        return transaction.item?.amount;
    }




    return (
        <IonList className='recent-transactions' >
            <IonListHeader>
                <IonLabel>Transacciones recientes</IonLabel>
            </IonListHeader>
            {
                transactions.map((item, index) => (
                    <IonItem key={index} routerLink={getRoute(item)}>
                        <IonLabel className='ion-text-wrap'>
                            <span className={getColor(item)} style={{ margin: 0 }}>{getSubtitle(item)}</span>
                            {getName(item)}
                        </IonLabel>
                        <IonNote slot="end" color="primary">
                            <IonText>
                                {
                                    item.type === 'transfer' && item.item && 'amountReceived' in item.item && item.item?.amountReceived !== null && (
                                        <p>
                                            {item.item?.amount} $
                                        </p>
                                    )
                                }
                                <h3 style={{ margin: 0 }}>{getAmount(item)} $</h3>
                            </IonText>
                        </IonNote>
                    </IonItem>
                ))
            }
        </IonList>
    )

}

export default RecentTransactions;